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
  imageUrl: string;
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
    description:
      "Pip is an amazing dog with a boundless energy for outdoor adventures. She loves to chase balls, frisbees, and anything else you throw her way. Pip is also incredibly intelligent and thrives on mental stimulation. She excels at learning new tricks and commands and is always eager to please her humans. Despite her active lifestyle, Pip also enjoys cuddling up on the couch for a relaxing evening with her favorite humans. She's a loyal companion and a true joy to be around.",
    isFavorite: true,
    location: { state: "NC", city: "Cary", zip: "27513" },
    imageUrl: "/src/img/petImages/petpals-dog-pip-01.jpg",
  },
  {
    id: 2,
    type: "Cat",
    breed: "Domestic Longhair",
    age: "9",
    sex: "Male",
    name: "Kelvin",
    description:
      "Kelvin is a charming cat with a playful spirit and a gentle demeanor. He enjoys spending his days lounging in the sun, watching the world go by from his favorite window perch. Kelvin is also quite the foodie and takes great pleasure in mealtime, especially when it involves his favorite treats. Despite his independent nature, Kelvin is also quite affectionate and loves to snuggle up with his favorite humans. He's the perfect combination of playful and affectionate and would make a wonderful addition to any home.",
    isFavorite: true,
    location: { state: "CA", city: "San Francisco", zip: "94102" },
    imageUrl: "/src/img/petImages/petpals-cat-kelvin-02.jpg",
  },
  {
    id: 3,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "1",
    sex: "Male",
    name: "Toast",
    description:
      "Toast is a curious and adventurous kitty who loves to explore every nook and cranny of his surroundings. He's always on the lookout for new sights, sounds, and smells to investigate. Toast is also quite the social butterfly and enjoys meeting new people and animals wherever he goes. Despite his outgoing nature, Toast can be a bit shy at first, but once he warms up to you, he's a loyal and affectionate companion. With his playful personality and loving disposition, Toast is sure to bring joy and laughter to any home.",
    isFavorite: true,
    location: { state: "NY", city: "New York City", zip: "10001" },
    imageUrl: "/src/img/petImages/petpals-cat-toast-03.jpg",
  },
  {
    id: 4,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "0.75",
    sex: "Female",
    name: "Maus",
    description:
      "Maus is a very vocal kitty who loves to express herself with a wide range of meows, chirps, and purrs. She's incredibly playful and enjoys chasing toys around the house, especially ones that mimic the movements of birds or small rodents. Maus also has a sweet and affectionate side and loves nothing more than curling up in her favorite human's lap for a cozy nap. She's a true chatterbox and will keep you entertained with her antics and conversations all day long.",
    isFavorite: true,
    location: { state: "TX", city: "Houston", zip: "77001" },
    imageUrl: "/src/img/petImages/petpals-cat-maus-04.jpg",
  },
  {
    id: 5,
    type: "Dog",
    breed: "Golden Retriever",
    age: "12",
    sex: "Male",
    name: "Cooper",
    description:
      "Cooper is a wise and gentle soul who has spent his life spreading love and joy to everyone he meets. Despite his age, he still has a spring in his step and enjoys going for leisurely walks in the park, stopping to sniff every flower and greet every passerby along the way. Cooper is incredibly loyal and devoted to his family, and his warm and affectionate nature makes him a beloved member of the household. He may be getting older, but his heart is as big as ever, and he has plenty of love left to give to his forever family.",
    isFavorite: true,
    location: { state: "OH", city: "Columbus", zip: "43201" },
    imageUrl: "/src/img/petImages/petpals-dog-cooper-05.jpg",
  },
  {
    id: 6,
    type: "Dog",
    breed: "German Shepherd",
    age: "3",
    sex: "Male",
    name: "Tank",
    description:
      "Tank is a friendly and playful dog with a heart of gold. He loves nothing more than romping around in the great outdoors, whether it's hiking through the woods, playing fetch in the park, or splashing around in a nearby lake. Tank is also incredibly intelligent and thrives on mental stimulation, so he enjoys learning new tricks and commands to impress his humans. Despite his imposing size, Tank is a gentle giant at heart and is always eager to make new friends, both human and canine. With his boundless energy and affectionate nature, Tank is sure to bring endless joy and laughter to any home.",
    isFavorite: true,
    location: { state: "FL", city: "Miami", zip: "33101" },
    imageUrl: "/src/img/petImages/petpals-dog-tank-06.jpg",
  },
  {
    id: 7,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "2",
    sex: "Female",
    name: "Whiskers",
    description:
      "Whiskers is a gentle giant with a heart of gold. Despite her large size, she is incredibly graceful and moves with the elegance of a dancer. Whiskers enjoys spending her days lounging in the sun, watching the world go by from her favorite window perch. She's also quite the food connoisseur and takes great pleasure in mealtime, especially when it involves her favorite gourmet dishes. Despite her independent nature, Whiskers is also quite affectionate and loves to snuggle up with her favorite humans. With her majestic presence and loving disposition, Whiskers is sure to bring warmth and joy to any home.",
    isFavorite: false,
    location: { state: "CA", city: "Los  Angeles", zip: "90001" },
    imageUrl: "/src/img/petImages/petpals-cat-whiskers-07.jpg",
  },
  {
    id: 8,
    type: "Dog",
    breed: "Mix Breed",
    age: "3",
    sex: "Male",
    name: "Buddy",
    description:
      "Buddy is a loyal and devoted companion who would do anything for his humans. He's incredibly affectionate and loves nothing more than showering his family with slobbery kisses and tail wags. Buddy is also quite the social butterfly and enjoys making new friends wherever he goes, both human and canine. He's incredibly playful and enjoys romping around in the yard or going for long walks in the park. Despite his boundless energy, Buddy also knows how to relax and can often be found curled up on the couch, snoozing away the afternoon. With his loving heart and playful spirit, Buddy is sure to bring endless joy and laughter to any home.",
    isFavorite: true,
    location: { state: "IL", city: "Chicago", zip: "60601" },
    imageUrl: "/src/img/petImages/petpals-dog-buddy-08.jpg",
  },
  {
    id: 9,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "3",
    sex: "Male",
    name: "Zues",
    description:
      "Zues is a majestic feline with a regal presence and an independent spirit. He's incredibly intelligent and enjoys solving puzzles and figuring out how things work. Zues is also quite the explorer and loves to climb to the highest heights in search of adventure. Despite his independent nature, Zues is also quite affectionate and loves to snuggle up with his favorite humans after a long day of exploring. With his majestic presence and loving disposition, Zues is sure to bring warmth and joy to any home.",
    isFavorite: false,
    location: { state: "PA", city: "Philadelphia", zip: "19101" },
    imageUrl: "/src/img/petImages/petpals-cat-zues-09.jpg",
  },
  {
    id: 10,
    type: "Dog",
    breed: "Golden Retriever",
    age: "1",
    sex: "Male",
    name: "Sunny",
    description:
      "Sunny is a playful and energetic pup with a heart full of sunshine. He's always ready for an adventure, whether it's a hike through the mountains or a game of fetch in the backyard. Sunny is incredibly intelligent and loves to learn new tricks and commands to impress his humans. Despite his boundless energy, Sunny also has a gentle and affectionate side and loves nothing more than cuddling up with his favorite humans after a long day of play. With his bright personality and loving disposition, Sunny is sure to bring endless joy and laughter to any home.",
    isFavorite: true,
    location: { state: "AZ", city: "Phoenix", zip: "85001" },
    imageUrl: "/src/img/petImages/petpals-dog-sunny-10.jpg",
  },
  {
    id: 11,
    type: "Rabbit",
    breed: "Holland Lop",
    age: "1",
    sex: "Female",
    name: "Cotton",
    description:
      "Cotton is a sweet and gentle rabbit with a fluffy white coat that's as soft as a cloud. She loves to hop around her enclosure, exploring every nook and cranny with boundless curiosity. Cotton also enjoys munching on fresh veggies and hay and can often be found nibbling on her favorite treats. Despite her small size, Cotton has a big personality and loves to interact with her humans, whether it's receiving pets and cuddles or playing games together. With her gentle nature and adorable appearance, Cotton is sure to melt the hearts of everyone she meets.",
    isFavorite: false,
    location: { state: "MI", city: "Detroit", zip: "48201" },
    imageUrl: "/src/img/petImages/petpals-rabbit-cotton-11.jpg",
  },
  {
    id: 12,
    type: "Cat",
    breed: "Tabby",
    age: "0.5",
    sex: "Female",
    name: "Splash",
    description:
      "Splash is a playful and energetic kitten with a mischievous streak. She loves to race around the house at top speed, chasing after toys and causing mischief wherever she goes. Splash is also quite the acrobat and loves to climb to the highest heights in search of adventure. Despite her playful nature, Splash also has a sweet and affectionate side and loves nothing more than curling up in her favorite human's lap for a cozy nap. She's incredibly curious and loves to explore her surroundings, often sticking her nose into every nook and cranny to satisfy her curiosity. With her playful antics and loving personality, Splash is sure to bring endless joy and laughter to any home.",
    isFavorite: true,
    location: { state: "CO", city: "Denver", zip: "80201" },
    imageUrl: "/src/img/petImages/petpals-cat-splash-12.jpg",
  },
  {
    id: 13,
    type: "Dog",
    breed: "Bulldog (English Bulldog, French Bulldog)",
    age: "5",
    sex: "Female",
    name: "Luna",
    description:
      "Luna is a gentle and loyal companion who loves nothing more than spending time with her favorite humans. She's incredibly affectionate and loves to shower her family with slobbery kisses and tail wags. Luna is also quite the adventurer and enjoys exploring new places, whether it's hiking through the mountains or lounging on the beach. Despite her adventurous spirit, Luna also knows how to relax and can often be found snoozing in the sun or snuggled up on the couch with her humans. With her loving heart and gentle nature, Luna is sure to bring endless joy and warmth to any home.",
    isFavorite: false,
    location: { state: "MA", city: "Boston", zip: "02101" },
    imageUrl: "/src/img/petImages/petpals-dog-luna-13.jpg",
  },
  {
    id: 14,
    type: "Cat",
    breed: "Tabby",
    age: "4",
    sex: "Male",
    name: "Oliver",
    description:
      "Oliver is a curious and adventurous tabby cat with a zest for life. He loves to explore every nook and cranny of his surroundings, often getting into mischief along the way. Oliver is also quite the hunter and loves to chase after toys and play with anything that moves. Despite his mischievous nature, Oliver is also quite affectionate and loves to curl up in his human's lap for a cozy nap. With his playful spirit and loving personality, Oliver is sure to bring endless joy and laughter to any home.",
    isFavorite: true,
    location: { state: "WA", city: "Seattle", zip: "98101" },
    imageUrl: "/src/img/petImages/petpals-cat-oliver-14.jpg",
  },
  {
    id: 15,
    type: "Hamster",
    breed: "Syrian Hamster",
    age: "0.5",
    sex: "Female",
    name: "Nibbles",
    description:
      "Nibbles is a tiny bundle of energy with a big personality. She loves to run on her wheel for hours on end, getting her daily dose of exercise while entertaining her humans with her antics. Nibbles also enjoys exploring her cage and rearranging her bedding to her liking. Despite her small size, Nibbles has a big appetite and loves to munch on her favorite snacks, especially fresh veggies and seeds. With her lively spirit and adorable demeanor, Nibbles is sure to bring joy and laughter to any home.",
    isFavorite: false,
    location: { state: "GA", city: "Atlanta", zip: "30301" },
    imageUrl: "/src/img/petImages/petpals-hamster-nibbles-15.jpg",
  },
  {
    id: 16,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "5",
    sex: "Male",
    name: "Milo",
    description:
      "Milo is a friendly and outgoing cat with a larger-than-life personality. He loves to be the center of attention and will do anything to get noticed, from performing tricks to showing off his impressive vocal range. Milo is also quite the charmer and loves to cuddle up with his favorite humans, showering them with affection and purrs. Despite his outgoing nature, Milo also knows how to relax and can often be found lounging in the sun or curled up on the couch with his humans. With his friendly demeanor and loving heart, Milo is sure to win the hearts of everyone he meets.",
    isFavorite: true,
    location: { state: "NC", city: "Cary", zip: "27511" },
    imageUrl: "/src/img/petImages/petpals-cat-milo-16.jpg",
  },
  {
    id: 17,
    type: "Guinea Pig",
    breed: "American",
    age: "1.5",
    sex: "Female",
    name: "Peaches",
    description:
      "Peaches is a sweet and gentle guinea pig with a heart of gold. She loves to snuggle up in her cozy bedding and munch on her favorite snacks, especially fresh veggies and hay. Peaches is also quite the chatterbox and loves to squeak and chirp to let her humans know when she's happy or hungry. Despite her small size, Peaches has a big personality and loves to explore her surroundings, often sticking her nose into every nook and cranny to satisfy her curiosity. With her gentle nature and adorable demeanor, Peaches is sure to bring warmth and joy to any home.",
    isFavorite: false,
    location: { state: "MO", city: "Kansas City", zip: "64101" },
    imageUrl: "/src/img/petImages/petpals-guineapig-peaches-17.jpg",
  },
  {
    id: 18,
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "1",
    sex: "Female",
    name: "Rio",
    description:
      "Rio is a playful and adventurous cat with a love for the great outdoors. She enjoys spending her days exploring her surroundings, whether it's chasing butterflies in the garden or climbing trees in the backyard. Rio is also quite the hunter and loves to stalk her prey, pouncing with lightning speed to catch her target. Despite her adventurous spirit, Rio also has a sweet and affectionate side and loves nothing more than curling up in her human's lap for a cozy nap. With her playful antics and loving personality, Rio is sure to bring joy and laughter to any home.",
    isFavorite: true,
    location: { state: "OR", city: "Portland", zip: "97201" },
    imageUrl: "/src/img/petImages/petpals-cat-rio-18.jpg",
  },
  {
    id: 19,
    type: "Dog",
    breed: "Mix Breed",
    age: "5",
    sex: "Female",
    name: "Mazie",
    description:
      "Mazie is a gentle and loving dog with a heart as big as her smile. She enjoys spending her days lounging in the sun, going for leisurely walks in the park, and playing fetch with her favorite toys. Mazie is incredibly loyal and devoted to her family, and her sweet and affectionate nature makes her a beloved companion to all who meet her. Despite her age, Mazie still has plenty of energy and loves to play and explore her surroundings. With her gentle demeanor and loving personality, Mazie is sure to bring warmth and joy to any home.",
    isFavorite: true,
    location: { state: "VA", city: "Richmond", zip: "23218" },
    imageUrl: "/src/img/petImages/petpals-dog-mazie-19.jpg",
  },
  {
    id: 20,
    type: "Dog",
    breed: "Mix Breed",
    age: "2.5",
    sex: "Male",
    name: "Cruizer",
    description:
      "Cruizer is a sweet and gentle dog with a warm and friendly personality. He loves to snuggle up in his cozy bed and munch on his favorite snacks, especially crunchy biscuits and chew toys. Cruizer is also quite the explorer and loves to roam around the house or the park, sniffing and investigating every corner. Despite his small size, Cruizer has a big heart and loves to interact with his humans, whether it's receiving pets and belly rubs or playing fetch together. With his gentle nature and adorable appearance, Cruizer is sure to bring warmth and joy to any home.",
    isFavorite: false,
    location: { state: "AZ", city: "Phoenix", zip: "85001" },
    imageUrl: "/src/img/petImages/petpals-dog-cruizer-20.jpg",
  },
].map((animal) => ({
  ...animal,
  breed: getBreedListByType(animal.type).includes(animal.breed)
    ? animal.breed
    : "", // If the breed is not found in the breed list, set it to an empty string
}));

export default initialAnimals;
