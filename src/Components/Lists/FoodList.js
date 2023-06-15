import { useEffect, useState } from "react";
import { calculateSummedNutrients } from "./CalculateSum";

export const FoodList = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(0);
  const [food, setFood] = useState([]);
  const [nutrients, setNutrients] = useState([]);
  const [summedNutrients, setSummedNutrients] = useState({});

  useEffect(() => {
    const summedNutrients = calculateSummedNutrients(nutrients); 
    setSummedNutrients(summedNutrients);
  }, [nutrients]);

  

  useEffect(() => {
    fetch("http://localhost:8088/Lists")
      .then(response => response.json())
      .then(data => setLists(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8088/foodItems")
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
        const nutrientMatches = data.filter(nutrient => food.map(item => item.nutrientId).includes(nutrient.marker));
        setNutrients(nutrientMatches);
      });
  }, [food]);

  const handleDeleteFood = (foodId, nutrientId) => {
    fetch(`http://localhost:8088/foodItems/${foodId}`, {
      method: "DELETE"
    })
      .then(() => {
        setFood(prevFood => prevFood.filter(item => item.id !== foodId));
        setNutrients(prevNutrients => prevNutrients.filter(nutrient => nutrient.marker !== nutrientId));
      })
      .catch(error => {
        console.log("Error deleting food item:", error);
      });
  };

  return (
    <>
      <h1>Your Lists</h1>
      <select required onChange={(evt) => setSelectedList(evt.target.value)}>
        {lists.length === 0 ? (
          <option value={0}>Click the create List Link</option>
        ) : (
          <option value={0}>Please select a list</option>
        )}
        {lists.map(list => (
          <option value={list.id} key={`list--${list.id}`}>
            {list.name}
          </option>
        ))}
      </select>
      <h3>Your foods</h3>
      <ul>
        {food.map(item => (
          <li key={`food--${item.id}`}>
            {item.food}
            <button onClick={() => handleDeleteFood(item.id, item.nutrientId)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Your Nutrients</h3>
      <ul>
        {Object.entries(summedNutrients).map(([name, { sum, unit }]) => (
          <li key={name}>
            {name}: {sum} {unit}
          </li>
        ))}
      </ul>
    </>
  )}