const fetch = require('node-fetch');
const fs = require('fs');
const data = require('../data/node/parking-data.json');

const identifierEndPoint = 'https://opendata.rdw.nl/resource/mz4f-59fw.json';
const parkingFacilityEndPoint =
  'https://npropendata.rdw.nl/parkingdata/v2/static/';

// Fetch parking facility identifier (UUID)
async function fetchIdentifier(url) {
  const fetchIdentifier = await fetch(url);
  const formatIdentifier = await fetchIdentifier.json();

  return formatIdentifier;
}

// Fetch unique parking facility data
async function fetchParkingFacilityData() {
  try {
    const identifierObject = await fetchIdentifier(identifierEndPoint);

    // Fetch data
    const staticParkingFacilityData = identifierObject
      .slice(0, 500) // Add limit to prevent rate limit
      .map(async (parkingFacility) => {
        const identifier = parkingFacilityEndPoint + parkingFacility.uuid;

        const data = await fetch(identifier);

        return data;
      });

    // Format data to JSON
    const formatStaticParkingFacilityData = await Promise.all(
      staticParkingFacilityData
    ).then((parkingFacility) => {
      return Promise.all(
        parkingFacility.map((parkingFacility) => {
          return parkingFacility.json();
        })
      );
    });

    // Write data to JSON file
    fs.writeFileSync(
      './src/data/node/parking-data.json',
      JSON.stringify(formatStaticParkingFacilityData, null, 2)
    );

    return formatStaticParkingFacilityData;
  } catch (e) {
    console.log(e);
  }
}

// fetchParkingFacilityData();

// Filter parking facility selling points
function filterData(key, data) {
  let filteredObj = [];

  data.forEach((parkingFacility) => {
    if (parkingFacility.parkingFacilityInformation.hasOwnProperty(key)) {
      parkingFacility.parkingFacilityInformation[key].forEach((location) => {
        let sellingPointLocations = {};

        const parkingFacilityDescription =
          parkingFacility.parkingFacilityInformation.description;

        location.sellingPointLocation.forEach((coordinates) => {
          const sellingPointCoordinates = [
            coordinates.longitude,
            coordinates.latitude,
          ];

          sellingPointLocations = {
            description: parkingFacilityDescription,
            sellingPointCoordinates,
          };
        });

        filteredObj.push(sellingPointLocations);
      });
    }
  });

  // Write data to JSON file
  fs.writeFileSync(
    './src/data/node/selling-points.json',
    JSON.stringify(filteredObj, null, 2)
  );
}

filterData('sellingPoints', data);
