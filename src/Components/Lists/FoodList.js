import { useEffect, useState } from "react";
import { calculateSummedNutrients } from "./CalculateSum";
import { TotalNutrients } from "./TotalNutrients";
export const FoodList = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(0);
  const [food, setFood] = useState([]);
  const [nutrients, setNutrients] = useState([]);
  const [summedNutrients, setSummedNutrients] = useState({});
  const [selectedListName, setSelectedListName] = useState("");

  const localEasyUser = localStorage.getItem("easy_user")
  const EasyUserObject = JSON.parse(localEasyUser)
  const EasyId = EasyUserObject.id

 

  useEffect(() => {
    const summedNutrientss = calculateSummedNutrients(nutrients);
    setSummedNutrients(summedNutrientss);
  }, [nutrients]);

  useEffect(() => {
    fetch(`http://localhost:8088/lists?_expand=category&userId=${EasyId}`)
      .then(response => response.json())
      .then(data => setLists(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/foodItems?userId=${EasyId}`)
      .then(response => response.json())
      .then(data => {
        const foodMatches = data.filter(food => food.listId === parseInt(selectedList));
        setFood(foodMatches);
      });
  }, [selectedList]);

  useEffect(() => {
    fetch("http://localhost:8088/nutrients")
    .then(response => response.json())
    .then(data => {
        const nutrientMatches = data.filter(nutrient => food.map(item => item.id).includes(nutrient.foodId));
  
        const updatedNutrientMatches = nutrientMatches.map(nutrient => {
          const foodItem = food.find(item => item.id === nutrient.foodId);
          const updatedAmount = nutrient.amount * foodItem.quantity;
          return { ...nutrient, amount: updatedAmount };
        });
  
        setNutrients(updatedNutrientMatches);
      });
  }, [food]);
  
  


  const handleDeleteFoodAndNutrients = (foodId) => {
    fetch(`http://localhost:8088/foodItems/${foodId}`, {
      method: "DELETE"
    })
    .then(() => {
     const deletedNutrients = nutrients.filter((nutrient) => nutrient.foodId === foodId)
     deletedNutrients.map( nutrient => {
      fetch(`http://localhost:8088/nutrients/${nutrient.id}`, {
        method:"DELETE"
      })})
    })
      .then(() => {
        setFood(prevFood => prevFood.filter(item => item.id !== foodId));
        setNutrients(prevNutrients => prevNutrients.filter(nutrient => nutrient.foodId !== foodId));
      })
      .catch(error => {
        console.log("Error deleting food item:", error);
      });
  };
  


  const handleListSelect = (event) => {
    const value = parseInt(event.target.value)
    const name = lists.find((list) => list.id === parseInt(value))?.name || "";
    setSelectedList(value)
    setSelectedListName(name)
  }

  
  const handleListNameChange = () => {
    fetch(`http://localhost:8088/Lists/${selectedList}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: selectedListName }),
    })
  };
  
  const handleDeleteList = () => {
    fetch(`http://localhost:8088/Lists/${selectedList}`, {
      method: "DELETE",
  })
  .then(() => {
    setLists(prevLists => prevLists.filter( list => list.id !== selectedList))
    setFood(prevFood => prevFood.filter(food => food.listId !== selectedList))
    setNutrients(prevNutrients => prevNutrients.filter(nutrient => nutrient.listId !== selectedList))
    setSelectedList(0)
    setSelectedListName("")
  })
  }
  return (
    <>
      <h1>Your Lists</h1>
      <select required onChange={evt => handleListSelect(evt)}>
        {lists.length === 0 ? (
          <option value={0}>Click the create List Link</option>
        ) : (
          <option value={0}>Please select a list</option>
        )}
        {lists.map(list => (
          <option value={list.id} key={`list--${list.id}`}>
            {list.name}: {list.category.name}
          </option>
        ))}
      </select>
      <div>
      {selectedListName && <p>Selected List: {selectedListName}</p>}
      <button onClick={handleDeleteList}>delete list</button>
      </div>
      <input
        type="text"
        value={selectedListName}
        onChange={(event) => setSelectedListName(event.target.value)}
      />
      <button onClick={handleListNameChange}>Change Name</button>

      <h3>Your foods</h3>
      <ul>
        {food.map(item => (
          <li key={`food--${item.id}`}>
            {item.food} <br/> quantity {item.quantity} 
            <button onClick={() => handleDeleteFoodAndNutrients(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Your Nutrients</h3>
      <TotalNutrients sum={summedNutrients} />
    </>
  )
}