const fetch = require('node-fetch');
const fs = require('fs');
const data = require('../data/result.json');

const identifierEndPoint = 'https://opendata.rdw.nl/resource/mz4f-59fw.json';
const parkingFacilityEndPoint =
  'https://npropendata.rdw.nl/parkingdata/v2/static/';

async function fetchIdentifier(url) {
  const fetchIdentifier = await fetch(url);
  const formatIdentifier = await fetchIdentifier.json();

  return formatIdentifier;
}

async function fetchParkingFacilityData() {
  const identifierObject = await fetchIdentifier(identifierEndPoint);

  const staticParkingFacilityData = identifierObject
    .slice(0, 500)
    .map(async (parkingFacility) => {
      const identifier = parkingFacilityEndPoint + parkingFacility.uuid;

      const data = await fetch(identifier);

      return data;
    });

  const formatStaticParkingFacilityData = await Promise.all(
    staticParkingFacilityData
  ).then((parkingFacility) => {
    return Promise.all(
      parkingFacility.map((parkingFacility) => {
        return parkingFacility.json();
      })
    );
  });

  fs.writeFileSync(
    './src/data/result.json',
    JSON.stringify(formatStaticParkingFacilityData, null, 2)
  );

  return formatStaticParkingFacilityData;
}

function filterData(key, data) {
  let filteredObj = [];
  data.forEach((parkingFacility) => {
    if (parkingFacility.parkingFacilityInformation.hasOwnProperty(key)) {
      parkingFacility.parkingFacilityInformation[key].forEach((location) => {
        let sellingPointLocations = {};

        const parkingFacilityDescription =
          parkingFacility.parkingFacilityInformation.description;

        location.sellingPointLocation.forEach((coordinates) => {
          const sellingPointCoordinates = {
            longitude: coordinates.longitude,
            latitude: coordinates.latitude,
          };

          sellingPointLocations = {
            description: parkingFacilityDescription,
            sellingPointCoordinates,
          };
        });

        filteredObj.push(sellingPointLocations);
      });
    }
  });

  fs.writeFileSync(
    './src/data/selling-points.json',
    JSON.stringify(filteredObj, null, 2)
  );
}

filterData('sellingPoints', data);
