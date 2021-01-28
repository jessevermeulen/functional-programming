import React from 'react';
import content from '../data/content.json';

export default function Footer() {
  return (
    <footer>
      <div>
        <h2>Gebruikte bronnen</h2>
        <ul>
          <li>
            <a href="https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-PARKEERGEBIED/mz4f-59fw">
              Open Data Parkeren: PARKEERGEBIED
            </a>
          </li>
          <li>
            <a href="https://npropendata.rdw.nl/parkingdata/v2/">
              NPR OpenData
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
