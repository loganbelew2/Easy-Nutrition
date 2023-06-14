import { useState } from "react"
import { SearchFood } from "./SearchFood"
import { DisplayFood } from "./DisplayFood"

export const FoodContainer = () => {
    const [searchedFood, searchInput] = useState("")

    return (<>
         <div>Start your nutrition journey today!</div>
        <SearchFood setterFunction ={ searchInput} />
        < DisplayFood searchState = {searchedFood}/>
        </>
    )
}