export function convertUnits(value, currentUnit) {
  
    if (currentUnit === 'g') {
      return value * 1000; // Convert grams to milligrams
    } else if (currentUnit === 'mg') {
      return value; // Already in milligrams, no conversion needed
    } else if (currentUnit === 'μg') {
      return value / 1000; // Convert micrograms to milligrams
    } 
    return value;
  }
  