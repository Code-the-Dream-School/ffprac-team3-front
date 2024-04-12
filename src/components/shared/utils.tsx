export const parseLocation = (
  location: string
): { city: string; state: string; zip: string } => {
  const parts = location.split("").map((part) => part.trim());
  let city = "";
  let state = "";
  let zip = "";

  parts.forEach((part) => {
    if (part.length === 2 && /[a-zA-Z]{2}/.test(part)) {
      // Assume it's a state abbreviation
      state = part.toUpperCase();
    } else if (part.length === 5 && /\d{5}/.test(part)) {
      // Assume it's a ZIP code
      zip = part;
    } else {
      // Assume it's part of the city
      if (city) {
        city += `${part}`;
      } else {
        city = part;
      }
    }
  });

  return { city, state, zip };
};
