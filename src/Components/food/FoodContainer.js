import { useEffect, useState } from "react"
import { SearchFood } from "./SearchFood"
import { DisplayFood } from "./DisplayFood"

export const FoodContainer = () => {
    const [searchedFood, searchInput] = useState("")
    const [Lists, setLists] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/Lists`)
        .then(response => response.json())
        .then(lists => setLists(lists))
    },[])

    return (<>
         <div>Start your nutrition journey today!</div>
        <SearchFood setterFunction ={ searchInput} listArray = { Lists } />
        < DisplayFood searchState = {searchedFood} />
        </>
    )
}