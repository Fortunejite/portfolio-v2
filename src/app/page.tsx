'use client';

import WelcomeScreen from '@/components/WelcomeScreen';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  return (
    <div>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      <>
        <footer>
          <center>
            <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
            <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
              © {new Date().getFullYear()}{' '}
                Fortune™
              . All Rights Reserved.
            </span>
          </center>
        </footer>
      </>
    </div>
  );
}
