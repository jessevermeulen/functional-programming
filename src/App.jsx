import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Map from './components/Map';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Map />
      </main>
    </>
  );
}
