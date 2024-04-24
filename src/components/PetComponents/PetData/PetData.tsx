import DogBreeds from "./DogBreeds";
import CatBreeds from "./CatBreeds";
import RabbitBreeds from "./RabbitBreeds";
import HamsterBreeds from "./HamsterBreeds";
import GuineaPigBreeds from "./GuineaPigBreeds";

interface Location {
  state: string | StateAbbreviation;
  city: string;
  zip: string;
}

type StateAbbreviation =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY";

interface Animal {
  id: number;
  type: string;
  age: string;
  sex: string;
  name: string;
  description: string;
  isFavorite: boolean;
  location: Location;
  breed: string;
}

// Function to get the correct breed array based on animal type
function getBreedListByType(type: string): string[] {
  switch (type.toLowerCase()) {
    case "dog":
      return DogBreeds;
    case "cat":
      return CatBreeds;
    case "rabbit":
      return RabbitBreeds;
    case "hamster":
      return HamsterBreeds;
    case "guinea pig":
      return GuineaPigBreeds;
    default:
      return [];
  }
}


export default getBreedListByType
