// export const parseLocation = (
//   location: string
// ): { city: string; state: string; zip: string } => {
//   const parts = location.split(",").map((part) => part.trim()); // Split by comma

//   let state = "";
//   let city = "";
//   let zip = "";

//   parts.forEach((part) => {
//     if (part.length === 2 && /[a-zA-Z]{2}/.test(part)) {
//       // Assume state abbreviation
//       state = part.toUpperCase();
//     } else if (part.length === 5 && /\d{5}/.test(part)) {
//       // Assume ZIP code
//       zip = part;
//     } else {
//       // Assume it's part of the city
//       city += `${part}, `; // Add comma back to separate city parts
//     }
//   });

//   // Trim any trailing spaces and commas from the city
//   city = city.trim().replace(/,$/, ""); // Remove trailing comma if present

//   return { city, state, zip };
// };
