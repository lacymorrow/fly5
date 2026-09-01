import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Contact-form health check (LAC-3573).
 *
 * Verifies the configuration that historically takes the contact form down —
 * a missing/revoked email-provider key or a missing recipient address —
 * WITHOUT sending a real email. A daily CI job (see
 * .github/workflows/contact-form-healthcheck.yml) hits this endpoint and pages
 * us the moment any check fails.
 *
 * Optionally gated by HEALTHCHECK_TOKEN: if that env var is set, callers must
 * pass ?token=... or an "x-healthcheck-token" header. If it is unset, the
 * endpoint is open (so monitoring keeps working even before the token exists).
 */

const RESEND_DOMAINS_URL = 'https://api.resend.com/domains';

interface Check {
	name: string;
	ok: boolean;
	detail: string;
}

const isAuthorized = (req: NextApiRequest): boolean => {
	const expected = process.env.HEALTHCHECK_TOKEN;
	if (!expected) return true;
	const header = req.headers['x-healthcheck-token'];
	const headerValue = Array.isArray(header) ? header[0] : header;
	const queryValue = Array.isArray(req.query.token) ? req.query.token[0] : req.query.token;
	return headerValue === expected || queryValue === expected;
};

// Confirms the Resend API key is present AND actually valid, by making a
// lightweight authenticated read (listing domains). No email is sent.
const checkResend = async (): Promise<Check> => {
	const key = process.env.RESEND_API_KEY;
	if (!key) return { name: 'resend_api_key', ok: false, detail: 'RESEND_API_KEY not set' };

	try {
		const response = await fetch(RESEND_DOMAINS_URL, {
			headers: { Authorization: `Bearer ${key}` },
		});
		if (response.status === 401 || response.status === 403) {
			return { name: 'resend_api_key', ok: false, detail: `Resend rejected key (HTTP ${response.status})` };
		}
		if (!response.ok) {
			return { name: 'resend_api_key', ok: false, detail: `Resend API unhealthy (HTTP ${response.status})` };
		}
		return { name: 'resend_api_key', ok: true, detail: 'valid' };
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return { name: 'resend_api_key', ok: false, detail: `Resend request failed: ${message}` };
	}
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		return res.status(405).json({ ok: false, error: 'Method not allowed' });
	}
	if (!isAuthorized(req)) {
		return res.status(401).json({ ok: false, error: 'Unauthorized' });
	}

	const checks: Check[] = [];
	const hasResend = Boolean(process.env.RESEND_API_KEY);

	checks.push({
		name: 'email_provider_configured',
		ok: hasResend,
		detail: hasResend ? 'resend' : 'RESEND_API_KEY not set',
	});

	checks.push({
		name: 'receiving_email',
		ok: Boolean(process.env.RECEIVING_EMAIL),
		detail: process.env.RECEIVING_EMAIL ? 'set' : 'RECEIVING_EMAIL not set (using fallback)',
	});

	if (hasResend) {
		checks.push(await checkResend());
	}

	const ok = checks.every((c) => c.ok);
	res.setHeader('Cache-Control', 'no-store, max-age=0');
	return res.status(ok ? 200 : 503).json({ ok, checks });
};

export default handler;
