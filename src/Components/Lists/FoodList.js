import { useEffect, useState } from "react"

export const FoodList = () => {


    const [Lists, setLists] = useState([])
    const [list, setSelectedList] = useState(0)
    const [food, setFood] = useState([])
    const [nutrients, setNutrients] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/Lists`)
            .then(response => response.json())
            .then(data => setLists(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/foodItems`)
            .then(response => response.json())
            .then(data => 
             {  const foodMatches = data.filter( (food) => food.listId === parseInt(list))
                setFood(foodMatches)
             })
    },[list])

    useEffect(() => {
        fetch(`http://localhost:8088/nutrients`)
          .then(response => response.json())
          .then(data => {
            const nutrientMatches = data.filter(nutrient => food.map(item => item.nutrientId).includes(nutrient.marker));
            setNutrients(nutrientMatches);
          });
      }, [food]);
      

    return (
        <>
            <h1>Your Lists </h1>
            <select required onChange={(evt) => setSelectedList(evt.target.value)}>
                {
                    Lists.length === 0 ? (<option value={0}> click the create List Link</option>) :
                        (<option value={0}>please select a list</option>)
                }

                {
                    Lists.map(
                        (list) => (<option value={list.id} key={`list--${list.id}`}>{list.name}</option>)
                    )
                }
            </select>

            {/* <ul>
                {
                food.filter((item) => item.listId === parseInt(list))
                    .map((item) => (
                        <li key={`food--${item.id}`}>{item.food}</li>
                    ))}
            </ul> */}

        </>
    )

}