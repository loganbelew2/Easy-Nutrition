import { convertUnits } from "./ConvertUnits";

    export const TotalNutrients = (summedNutrients, values) => {

        function createNutrientDVObject() {
            const nutrientDV = {
              "Calcium, Ca": 1300,
              "Manganese, Mn": 2.3,
              "Selenium, Se": 55,
              "Vitamin C, total ascorbic acid": 90,
              "Thiamin": 1.2,
              "Riboflavin": 1.3,
              "Niacin": 16,
              "Iron, Fe": 18,
              "Vitamin B-6": 1.7,
              "Folate, total": 400,
              "Folic acid": 400,
              "Folate, food": 400,
              "Choline, total": 550,
              "Vitamin B-12": 2.4,
              "Vitamin A, IU": 5000,
              "Vitamin D (D2 + D3), International Units": 400-800,
              "Magnesium, Mg": 420,
              "Phosphorus, P": 1250,
              "Potassium, K": 4700,
              "Sodium, Na": 2300,
              "Zinc, Zn": 11,
              "Copper, Cu": 0.9
            };
          
            return nutrientDV;
          }
          
          // Example usage
          const nutrientDVObject = createNutrientDVObject();
          console.log(nutrientDVObject);
          
        <ul>
        {Object.entries(summedNutrients).map(([name, { sum, unit }]) => {
          const nutrientDV = nutrientDVObject[name]; // Assuming you have the nutrientDVObject
      
          // Convert units if necessary
          const convertedSum = convertUnits(sum, unit, nutrientDV.unit);
      
          // Calculate the percentage DV
          const percentageDV = (convertedSum / nutrientDV.value) * 100;
      
          return (
            <li key={name}>
              {name}: {sum} {unit} ({percentageDV.toFixed(2)}% DV)
            </li>
          );
        })}
      </ul>
      
      };
      
      

