import { ReactNode } from "react";

import Link from "next/link";

import config from "../utils/config";

type MainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: MainProps) => (
  <div className="flex flex-col w-full min-h-screen">
    {props.meta}

    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:p-2"
    >
      Skip to main content
    </a>

    <div className="max-w-screen-md w-full mx-auto">
      <header className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="font-extrabold text-6xl text-gray-900">
            {config.title}
          </div>
          <div className="text-xl uppercase">{config.tagline}</div>
        </div>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap text-xl">
            <li className="mr-6">
              <Link href="/">Home</Link>
            </li>
            <li className="mr-6">
              <Link href="/portfolio/">Portfolio</Link>
            </li>
            <li className="mr-6">
              <Link href="/about/">About</Link>
            </li>
            <li className="mr-6">
              <Link href="/contact/">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main-content" role="main" className="py-5 text-xl content">
        {props.children}
      </main>

      <footer className="border-t border-gray-300 text-center py-8 text-sm">
        <p>
          &copy; {new Date().getFullYear()} {config.title}. All rights reserved.
        </p>
        <nav aria-label="Footer navigation" className="mt-2">
          <Link href="/privacy/" className="text-gray-600 hover:text-gray-900">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  </div>
);

export { Main };
