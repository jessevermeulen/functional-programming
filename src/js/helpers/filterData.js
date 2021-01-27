const fs = require('fs');
const geoJson = require('geojson');
const data = require('../../data/node/parking-data.json');

function filterData(key, data) {
  let areaSpecifications = [];
  let areaSellingPoints = [];

  data.map((parkingArea) => {
    const area = parkingArea.parkingFacilityInformation;
    const areaName = area.name;

    const specifications = area.specifications.map((specification) => {
      const obj = {
        name: areaName,
        usage: specification.usage,
        capacity: specification.capacity,
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
        const description = location.sellingPointDescription
          ? location.sellingPointDescription
              .toLowerCase()
              .replace(/[']+/g, '')
              .replace(/(^|\s)\S/g, (l) => l.toUpperCase())
          : specifications[0].name;
        const obj = {
          name: description,
          coordinates: [
            location.sellingPointLocation[0].longitude,
            location.sellingPointLocation[0].latitude,
          ],
        };

        areaSellingPoints.push(obj);
      });

      const convertToGeoJson = geoJson.parse(areaSellingPoints, {
        Point: 'coordinates',
      });

      // Write data to JSON file
      fs.writeFileSync(
        './src/data/node/parking-areas.json',
        JSON.stringify(convertToGeoJson, null, 2)
      );
    }
  });
}

filterData('sellingPoints', data);
