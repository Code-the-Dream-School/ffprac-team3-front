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

const initialAnimals: Animal[] = [
  {
    id: 1,
    type: "Dog",
    breed: "Border Collie",
    age: "7",
    sex: "Female",
    name: "Pip",
    description: "Pip is an amazing dog...",
    isFavorite: true,
    location: { state: "NC", city: "Cary", zip: "27513" },
  },
  {
    id: 2,
    type: "Cat",
    breed: "Domestic Longhair",
    age: "9",
    sex: "Male",
    name: "Kelvin",
    description: "Kelvin is a great lap cat...",
    isFavorite: true,
    location: { state: "CA", city: "San Francisco", zip: "94102" },
  },
  {
    id: 3,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "Young",
    sex: "Male",
    name: "Toast",
    description: "Toast is a nervous kitty...",
    isFavorite: true,
    location: { state: "NY", city: "New York City", zip: "10001" },
  },
  {
    id: 4,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "Young",
    sex: "Female",
    name: "Maus",
    description: "Maus is a very vocal kitty...",
    isFavorite: true,
    location: { state: "TX", city: "Houston", zip: "77001" },
  },
  {
    id: 5,
    type: "Dog",
    breed: "Golden Retriever",
    age: "Senior",
    sex: "Male",
    name: "Cooper",
    description: "Cooper is a mommy's boy...",
    isFavorite: true,
    location: { state: "OH", city: "Columbus", zip: "43201" },
  },
  {
    id: 6,
    type: "Dog",
    breed: "German Shepherd",
    age: "3",
    sex: "Male",
    name: "Tank",
    description: "Friendly and playful dog.",
    isFavorite: true,
    location: { state: "FL", city: "Miami", zip: "33101" },
  },
  {
    id: 7,
    type: "Cat",
    breed: "Maine Coon",
    age: "2",
    sex: "Female",
    name: "Whiskers",
    description: "Quiet and affectionate cat.",
    isFavorite: false,
    location: { state: "CA", city: "Los Angeles", zip: "90001" },
  },
  {
    id: 8,
    type: "Dog",
    breed: "Labrador Retriever",
    age: "3",
    sex: "Male",
    name: "Buddy",
    description: "Friendly and playful dog.",
    isFavorite: true,
    location: { state: "IL", city: "Chicago", zip: "60601" },
  },
  {
    id: 9,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "3",
    sex: "Male",
    name: "Zues",
    description: "Quiet and affectionate cat.",
    isFavorite: false,
    location: { state: "PA", city: "Philadelphia", zip: "19101" },
  },
  {
    id: 10,
    type: "Dog",
    breed: "Golden Retriever",
    age: "1",
    sex: "Male",
    name: "Sunny",
    description: "Friendly young dog with a cheerful personality.",
    isFavorite: true,
    location: { state: "AZ", city: "Phoenix", zip: "85001" },
  },
  {
    id: 11,
    type: "Rabbit",
    breed: "Holland Lop",
    age: "1",
    sex: "Female",
    name: "Cotton",
    description: "Fluffy white rabbit who loves to hop around.",
    isFavorite: false,
    location: { state: "MI", city: "Detroit", zip: "48201" },
  },
  {
    id: 12,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "0.5",
    sex: "Female",
    name: "Splash",
    description: "Young playful friendly cat",
    isFavorite: true,
    location: { state: "CO", city: "Denver", zip: "80201" },
  },
  {
    id: 13,
    type: "Dog",
    breed: "Labrador Retriever",
    age: "5",
    sex: "Female",
    name: "Luna",
    description: "Gentle and loyal companion who loves long walks.",
    isFavorite: false,
    location: { state: "MA", city: "Boston", zip: "02101" },
  },
  {
    id: 14,
    type: "Cat",
    breed: "Tabby",
    age: "4",
    sex: "Male",
    name: "Oliver",
    description: "Curious and mischievous tabby cat.",
    isFavorite: true,
    location: { state: "WA", city: "Seattle", zip: "98101" },
  },
  {
    id: 15,
    type: "Hamster",
    breed: "Syrian Hamster",
    age: "0.5",
    sex: "Female",
    name: "Nibbles",
    description: "Tiny hamster who enjoys running in her wheel.",
    isFavorite: false,
    location: { state: "GA", city: "Atlanta", zip: "30301" },
  },
  {
    id: 16,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "2",
    sex: "Male",
    name: "Milo",
    description: "Friendly giant that likes to open cupboards.",
    isFavorite: true,
    location: { state: "NC", city: "Charlotte", zip: "28201" },
  },
  {
    id: 17,
    type: "Guinea Pig",
    breed: "American",
    age: "1.5",
    sex: "Female",
    name: "Peaches",
    description: "Adorable guinea pig who loves fresh veggies.",
    isFavorite: false,
    location: { state: "MO", city: "Kansas City", zip: "64101" },
  },
  {
    id: 18,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "1",
    sex: "Female",
    name: "Rio",
    description: "Happy cat that loves to watch birds.",
    isFavorite: true,
    location: { state: "OR", city: "Portland", zip: "97201" },
  },
  {
    id: 19,
    type: "Dog",
    breed: "Labrador Retriever",
    age: "5",
    sex: "Female",
    name: "Mazie",
    description: "Loving mature dog enjoys to cuddle.",
    isFavorite: true,
    location: { state: "VA", city: "Richmond", zip: "23218" },
  },
  {
    id: 20,
    type: "Guinea Pig",
    breed: "Abyssinian",
    age: "2.5",
    sex: "Male",
    name: "Cocoa",
    description: "Fuzzy guinea pig who enjoys snacking on hay.",
    isFavorite: false,
    location: { state: "AZ", city: "Phoenix", zip: "85001" },
  },
].map((animal) => ({
  ...animal,
  breed: getBreedListByType(animal.type).includes(animal.breed)
    ? animal.breed
    : "", // If the breed is not found in the breed list, set it to an empty string
}));

export default initialAnimals;
