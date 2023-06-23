import { useEffect, useState } from "react"
import { SearchFood } from "./SearchFood"
import { DisplayFood } from "./DisplayFood"
import "./food.css"
export const FoodContainer = () => {
    const [searchedFood, searchInput] = useState("")
    const [Lists, setLists] = useState([])
    const [selectedList, setSelectedList] = useState(0)

    const localEasyUser = localStorage.getItem("easy_user")
    const EasyUserObject = JSON.parse(localEasyUser)
    const EasyId = EasyUserObject.id

    useEffect(() => {
        fetch(`http://localhost:8088/lists?_expand=category&userId=${EasyId}`)
            .then(response => response.json())
            .then(lists => setLists(lists)) //eslint-disable-next-line
    }, [])

    return (<>
        <div>Start your nutrition journey today!</div>
        <section>
        <SearchFood searchContent={searchInput} listArray={Lists} setList={setSelectedList} />
        < DisplayFood searchState={searchedFood} myList={selectedList} />
        </section>
    </>
    )
}