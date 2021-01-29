const fs = require('fs');
const geoJson = require('geojson');
const data = require('../../data/node/parking-data.json');

function filterData(key, data) {
  let areaSpecifications = [];
  let areaCoordinates = [];

  data.map((parkingArea) => {
    const area = parkingArea.parkingFacilityInformation;
    const areaName = area.name;

    const specifications = area.specifications.map((specification) => {
      const usage = specification.usage;
      const obj = {
        name: areaName,
        usage: usage,
        capacity: !specification.capacity ? null : specifications.capacity,
        disabledAccess: specification.disabledAccess,
      };

      return obj;
    });

    areaSpecifications.push(specifications[0]);

    // Write data to JSON file
    fs.writeFileSync(
      './src/data/node/parking-specification.json',
      JSON.stringify(areaSpecifications, null, 2)
    );

    if (area.hasOwnProperty(key)) {
      area[key].map((location) => {
        if (key === 'sellingPoints') {
          const description = location.sellingPointDescription
            ? location.sellingPointDescription
                .toLowerCase()
                .replace(/[']+/g, '')
                .replace(/(^|\s)\S/g, (l) => l.toUpperCase())
            : specifications[0].name;
          const obj = {
            identifier: 'sellingPoint',
            name: description,
            usage: 'Betaald Parkeren',
            coordinates: [
              location.sellingPointLocation[0].longitude,
              location.sellingPointLocation[0].latitude,
            ],
          };

          areaCoordinates.push(obj);

          const convertToGeoJson = geoJson.parse(areaCoordinates, {
            Point: 'coordinates',
          });

          // Write data to JSON file
          fs.writeFileSync(
            './src/data/node/parking-selling.json',
            JSON.stringify(convertToGeoJson, null, 2)
          );
        } else if (key === 'accessPoints') {
          const usage = specifications[0].usage
            .toLowerCase()
            .replace('betaaldparkeren', 'betaald parkeren')
            .replace('vergunningparkeren', 'vergunning parkeren')
            .replace('garageparkeren', 'parkeergarage')
            .replace('garage parkeren', 'parkeergarage')
            .replace('terreinparkeren', 'terrein parkeren')
            .replace(/(^|\s)\S/g, (l) => l.toUpperCase());
          const obj = {
            identifier: 'accessPoint',
            name: specifications[0].name,
            usage: usage,
            coordinates: [
              location.accessPointLocation[0].longitude,
              location.accessPointLocation[0].latitude,
            ],
            address: [
              !location.accessPointAddress
                ? ''
                : location.accessPointAddress.streetName,
              !location.accessPointAddress
                ? ''
                : location.accessPointAddress.city,
            ],
          };

          areaCoordinates.push(obj);

          const convertToGeoJson = geoJson.parse(areaCoordinates, {
            Point: 'coordinates',
          });

          // Write data to JSON file
          fs.writeFileSync(
            './src/data/node/parking-access.json',
            JSON.stringify(convertToGeoJson, null, 2)
          );
        }
      });
    }
  });
}

filterData('accessPoints', data);
