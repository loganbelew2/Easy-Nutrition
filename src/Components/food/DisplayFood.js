import { useState } from "react"

export const DisplayFood = ({ searchState, myList}) => {
    const [searchResults, setSearchResults] = useState([])
    const [selectedFood, setSelectedFood] = useState([])
    const [selectedNutrients, setNutrients] = useState([])
    const [isAddButtonDisabled, setAddButtonDisabled] = useState(true)

    const localEasyUser = localStorage.getItem("easy_user")
    const EasyUserObject = JSON.parse(localEasyUser)


    const handleSearchButton = () => {
        fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query="${searchState}"&api_key=nUayw6tUK0qnDFUriuJsNuj9epCJa1htM7gbShIB`)
            .then(response => response.json())
            .then(data => {
                const exactMatches = data.foods.filter(food => food.description.toLowerCase() === searchState.toLowerCase())
                const Matches = data.foods.filter(food => food.description.toLowerCase().includes(searchState.toLowerCase()));
                if (exactMatches.length > 0) {
                    setSearchResults(exactMatches)
                } else {
                    setSearchResults(Matches)
                }
            })
    }


    const handleSelectedFood = (foodId) => {
        setAddButtonDisabled(true)
      fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?&api_key=nUayw6tUK0qnDFUriuJsNuj9epCJa1htM7gbShIB`)
            .then(response => response.json())
            .then(data => {
                const identifier = data.fdcId
                const foodName = data.description;
                const desiredNutrientIds = ["318", "324", "401", "404", "405", "406", "415", "417", "418", "421", "428", "431", "432", "301", "303", "304", "305", "306", "307", "309", "312", "313", "315", "317", "413"];
                const filteredNutrients = data.foodNutrients.filter(nutrient => desiredNutrientIds.includes(nutrient.nutrient.number));

                const nutrients = filteredNutrients.map(nutrient => ({
                    marker: identifier,
                    name: nutrient.nutrient.name,
                    amount: nutrient.amount,
                    unit: nutrient.nutrient.unitName
                }));

                setSelectedFood({
                    userId: EasyUserObject.id,
                    food: foodName,
                    nutrientId: identifier,
                    listId: parseInt(myList)
                });

                setNutrients(nutrients)  
              }).then(() => setTimeout(() => {
                setAddButtonDisabled(false)
              },2000)
              )
    }

    const postFoodAndNutrients = () => {
      if (myList === 0) {
        window.alert("Please select a list");
      } else {
        fetch("http://localhost:8088/foodItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedFood),
        })
          .then((response) => response.json())
          .then(() => {
            const postNutrientsRequests = selectedNutrients.map((nutrient) =>
              fetch("http://localhost:8088/nutrients", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(nutrient),
              })
            );
    
            Promise.all(postNutrientsRequests)
              .then(() => {
                window.alert("Food posted! Check out your food list now.");
              })
              .catch((error) => {
                console.log("Error posting nutrients:", error);
              });
          })
          .catch((error) => {
            console.log("Error posting food item:", error);
          });
      }
    };
    

    return (
        <>
            <button onClick={handleSearchButton}>Search</button>
            <div>
                <select required onChange={(e) => e.target.value !== '0' ? handleSelectedFood(e.target.value) : null}>
                    <option value="0">Please select a food</option>
                    {searchResults.length === 0 && (
                        <option disabled>No results found. Please refine your search.</option>
                    )}
                    {searchResults.map((result) => (
                        <option key={`food--${result.fdcId}`} value={result.fdcId}>
                            {result.description}
                        </option>
                    ))}
                </select>
                <button onClick={postFoodAndNutrients} disabled={isAddButtonDisabled}>Add Food</button>
            </div>
        </>
    );



}