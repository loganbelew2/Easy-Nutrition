export function convertUnits(value, currentUnit) {
    // Implement the logic for unit conversion here
    // Convert the 'value' from 'currentUnit' to milligrams (mg)
  
    // Example conversion logic:
    if (currentUnit === 'g') {
      return value * 1000; // Convert grams to milligrams
    } else if (currentUnit === 'mg') {
      return value; // Already in milligrams, no conversion needed
    } else if (currentUnit === 'μg') {
      return value / 1000; // Convert micrograms to milligrams
    } 
    return value;
  }
  