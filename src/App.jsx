import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Wrapper from './components/Wrapper';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Wrapper />
      </main>
    </>
  );
}
