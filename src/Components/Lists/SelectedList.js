import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const SelectedList = () => {
    const {listId} = useParams()
    const [Lists, setLists] = useState({})

    useEffect(() => {
        fetch(`http://localhost:8088/lists?_id=${listId}`)
          .then((response) => response.json())
          .then((data) => setLists(data));
          console.log(Lists)
      }, [listId]);

      return (
        <>
        <h2>My List</h2>
        {Lists.name}
        </>
      )

}