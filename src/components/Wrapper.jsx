import React, { useState } from 'react';
import merge from 'deepmerge';
import Map from './Map';
import content from '../data/content.json';
import parkingSelling from '../data/node/parking-selling.json';
import parkingAccess from '../data/node/parking-access.json';

const parkingData = merge(parkingSelling, parkingAccess);

console.log(parkingSelling)
console.log(parkingAccess);

export default function Toggle() {
  const [isActive, setActive] = useState('false');

  const handleToggle = () => {
    setActive(!isActive);
  };

  let data = parkingData;

  const filterUsage = (u) => {
    return (data = parkingData.features.filter(
      (d) => d.properties.usage === u
    ));
  };

  return (
    <section className={!isActive ? 'toggle-BetaaldParkeren' : null}>
      <p>{content.description}</p>

      <div className="buttons">
        <div className="button" onClick={handleToggle}>
          {content.buttons[0]} ({filterUsage(`${content.buttons[0]}`).length})
        </div>
        <div className="button">
          {content.buttons[1]} ({filterUsage(`${content.buttons[1]}`).length})
        </div>
        <div className="button">
          {content.buttons[2]} ({filterUsage(`${content.buttons[2]}`).length})
        </div>
        <div className="button">
          {content.buttons[3]} ({filterUsage(`${content.buttons[3]}`).length})
        </div>
      </div>

      <Map data={parkingData} />
    </section>
  );
}
