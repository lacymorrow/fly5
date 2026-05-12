import { ReactNode } from 'react';

import Link from 'next/link';

import { PageWrapper, Wrapper } from '../styles/main';
import config from '../utils/config';

type AltProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Alt = (props: AltProps) => (
  <PageWrapper className="alternative min-h-screen">
    {props.meta}

    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:p-2">
      Skip to main content
    </a>

    <header className="pt-2 pb-8 w-100 w-full mx-auto flex-col justify-center text-gray-900">
      <div className="relative">
        <div className="font-extrabold text-8xl px-5 md:pl-10 text-white text-center sm:text-left hover:opacity-100 hover:text-white">
          <Link href="/">
            <a className="font-extrabold text-8xl text-whit text-center transition duration-500 ease-in-out opacity-60 hover:opacity-80 hover:text-white">
              {config.title}
            </a>
          </Link>
        </div>
        <nav aria-label="Main navigation" className="flex flex-wrap text-lg mx-auto text-center justify-center opacity-60 mt-2">
          <Link href="/">
            <a className="text-white transition px-4">Home</a>
          </Link>
          <Link href="/portfolio/">
            <a className="text-white transition px-4">Portfolio</a>
          </Link>
          <Link href="/about/">
            <a className="text-white transition px-4">About</a>
          </Link>
          <Link href="/contact/">
            <a className="text-white transition px-4">Contact</a>
          </Link>
        </nav>
      </div>
    </header>
    <main id="main-content" role="main" className="px-5">
      <Wrapper className="max-w-screen-md w-full mx-auto bg-black rounded-lg overflow-hidden relative">
        {props.children}
      </Wrapper>
    </main>
    <footer className="text-center py-16 text-xs uppercase text-gray-700">
      <p>&copy; {new Date().getFullYear()} {config.title}. All rights reserved.</p>
      <nav aria-label="Footer navigation" className="mt-2">
        <Link href="/privacy/">
          <a className="text-gray-500 hover:text-gray-300 normal-case">Privacy Policy</a>
        </Link>
      </nav>
    </footer>
  </PageWrapper>
);

export { Alt };
