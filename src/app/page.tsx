'use client';

import About from '@/components/About';
import AnimatedBackground from '@/components/Background';
import Home from '@/components/Home';
import Navbar from '@/components/Navbar';
import WelcomeScreen from '@/components/WelcomeScreen';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © {new Date().getFullYear()} Fortune™ . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
}
