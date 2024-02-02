import { City } from "country-state-city";

// get rid of duplicates based on label
export const Locations = City.getCitiesOfCountry("GB")?.map((city: any) => {
  let value = "";
  if (city.name === "Bangor") {
    value = city.stateCode === "WLS" ? "Bangor (Wales)" : "Bangor (N.Ireland)";
  } else {
    value = city.name;
  }
  return {
    value: value,
    label: value,
  };
});
