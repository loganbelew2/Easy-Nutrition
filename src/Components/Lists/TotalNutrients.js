import { convertUnits } from "./ConvertUnits";

export const TotalNutrients = ({ sum }) => {
  function createNutrientDVObject() {
    return {
      "Calcium, Ca": { value: 1300, unit: "mg" },
      "Manganese, Mn": { value: 2.3, unit: "mg" },
      "Selenium, Se": { value: 55, unit: "mcg" },
      "Vitamin C, total ascorbic acid": { value: 90, unit: "mg" },
      "Thiamin": { value: 1.2, unit: "mg" },
      "Riboflavin": { value: 1.3, unit: "mg" },
      "Niacin": { value: 16, unit: "mg" },
      "Iron, Fe": { value: 18, unit: "mg" },
      "Vitamin B-6": { value: 1.7, unit: "mg" },
      "Folate, total": { value: 400, unit: "mcg" },
      "Folic acid": { value: 400, unit: "mcg" },
      "Folate, food": { value: 400, unit: "mcg" },
      "Choline, total": { value: 550, unit: "mg" },
      "Vitamin B-12": { value: 2.4, unit: "mcg" },
      "Vitamin A, IU": { value: 5000, unit: "IU" },
      "Vitamin D (D2 + D3), International Units": { value: 400-800, unit: "IU" },
      "Magnesium, Mg": { value: 420, unit: "mg" },
      "Phosphorus, P": { value: 1250, unit: "mg" },
      "Potassium, K": { value: 4700, unit: "mg" },
      "Sodium, Na": { value: 2300, unit: "mg" },
      "Zinc, Zn": { value: 11, unit: "mg" },
      "Copper, Cu": { value: 0.9, unit: "mg" }
    };
  }

  // Create the nutrientDVObject
  const nutrientDVObject = createNutrientDVObject();

  return (
    <ul>
      {Object.entries(sum).map(([name, { sum, unit }]) => {
        const nutrientDV = nutrientDVObject[name];

        // Convert units if necessary
        const convertedSum = nutrientDV ? convertUnits(sum, unit, nutrientDV.unit) : sum;

        // Calculate the percentage DV
        const percentageDV = (convertedSum / nutrientDV?.value) * 100;

        return (
          <li key={name}>
            {name}: {sum} {unit} ({percentageDV.toFixed(2)}% DV)
          </li>
        );
      })}
    </ul>
  );
};

      
      

