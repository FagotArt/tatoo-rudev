import { City } from "country-state-city";


// get rid of duplicates based on label
export const Locations = City.getCitiesOfCountry('GB')
  ?.filter((seen => (city:any) => {
    if (seen.has(city.name)) {
      return false;
    }
    seen.add(city.name);
    return true;
  })(new Set()))
  .map((city:any) => ({
    value: city.name,
    label: city.name
  }));