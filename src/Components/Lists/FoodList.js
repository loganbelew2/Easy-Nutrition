import { useEffect, useState } from "react"

export const FoodList = () => {
    //store lists resource in state on initial render then display all lists in dropdown
    //when list is selected then fetch all foods with corresponding listId's then display them
    //
    const [Lists, setLists] = useState([])

    useEffect( () => {
        fetch(`http://localhost:8088/Lists`)
        
    },[])
}