import React from 'react';
import content from '../data/content.json';

export default function Header() {
  return (
    <header>
      <span>{content.tagline}</span>
      <span>
        Een data story van{' '}
        <a href={content.author.domain} target="_blank">
          {content.author.name}
        </a>
      </span>
    </header>
  );
}
