import React, { useState } from 'react';
import merge from 'deepmerge';
import Map from './Map';
import content from '../data/content.json';
import parkingSelling from '../data/node/parking-selling.json';
import parkingAccess from '../data/node/parking-access.json';

const parkingData = merge(parkingSelling, parkingAccess);

export default function Toggle() {
  const [data, setData] = useState(parkingData);

  const filterUsage = (usage) => {
    const features = parkingData.features.filter(
      (d) => d.properties.usage === usage
    );
    console.log(features);
    let obj = {
      type: 'FeatureCollection',
      features: usage ? features : parkingData.features,
    };

    setData(obj);
  };

  return (
    <section>
      <p>{content.description}</p>

      <div className="buttons">
        {content.buttons.map((button, idx) => (
          <div
            key={idx}
            className="button"
            onClick={() => filterUsage(idx === 0 ? null : button)}
          >
            {button}
          </div>
        ))}
      </div>

      <Map data={data} />
    </section>
  );
}
