import { City } from "country-state-city";

export const Locations :any = City.getCitiesOfCountry('GB')?.map((city:any)=> ({
    value: city.name,
    label: city.name
}))

