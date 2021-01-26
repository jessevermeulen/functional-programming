import React from 'react';
import content from '../data/content.json'

export default function Hero() {
  return (
    <section>
      <h1>{content.title}</h1>
    </section>
  );
}