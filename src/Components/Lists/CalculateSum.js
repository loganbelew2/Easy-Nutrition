export const calculateSummedNutrients = (nutrients) => {
    const summedNutrients = nutrients.reduce((accumulator, nutrient) => {
      if (accumulator.hasOwnProperty(nutrient.name)) {
        accumulator[nutrient.name].sum += parseFloat(nutrient.amount);
      } else {
        accumulator[nutrient.name] = {
          sum: parseFloat(nutrient.amount),
          unit: nutrient.unit
        };
      }
      return accumulator;
    }, {});

    return summedNutrients
  };