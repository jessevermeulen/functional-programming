import dotenv from 'dotenv';
dotenv.config();

const cors = 'https://cors-anywhere.herokuapp.com/';
const endPoint = 'https://npropendata.rdw.nl/parkingdata/v2/';
const token = '$$app_token=' + process.env.OPENDATA_RDW_APPTOKEN;
const data = cors + endPoint;

async function fetchAllParkingFacilityData(url) {
  let response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json();
  }
}

async function fetchStaticParkingFacilityData() {
  let parkingFacilityData = await fetchAllParkingFacilityData(
    data + '?' + token
  );

  let staticParkingFacilityDataUrl = parkingFacilityData.ParkingFacilities.slice(
    0,
    3
  ).map((identifier) => cors + identifier.staticDataUrl + '?' + token);

  let staticParkingFacilityData = await staticParkingFacilityDataUrl.map(
    (parkingFacility, index) =>
      new Promise((resolve) =>
        setTimeout(() => resolve(fetch(parkingFacility)), index * 2000)
      )
  );

  let result = Promise.all(staticParkingFacilityData)
    .then((parkingFacility) => {
      return Promise.all(
        parkingFacility.map((parkingFacility) => {
          return parkingFacility.json();
        })
      );
    })
    .catch((e) => console.log(e));

  return result;
}

console.log(fetchStaticParkingFacilityData());
