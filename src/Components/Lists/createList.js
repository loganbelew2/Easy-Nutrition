import { useEffect, useState } from "react"

export const CreateList = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [selectedCategory, setCategory] = useState(0)
  const [formError, setFormError] = useState(false)

  const localEasyUser = localStorage.getItem("easy_user")
  const EasyUserObject = JSON.parse(localEasyUser)

  useEffect(() => {
    fetch("http://localhost:8088/categories")
      .then(response => response.json())
      .then(data => setCategories(data))
  }, [])

  const createNewList = (e) => {
    e.preventDefault()

    // Check if the required fields are filled out
    if (name.trim() === "" || selectedCategory === 0) {
      setFormError(true)
      return
    }

    const list = {
      name: name,
      categoryId: selectedCategory,
      userId: EasyUserObject.id
    }

    fetch("http://localhost:8088/Lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(list)
    }).then(response => {
      // Handle response
    })
  }

  return (
    <>
      <form>
        <h2>Create Your List</h2>

        <fieldset>
          <label htmlFor="name">Name of List</label>
          <input id="name" value={name} onChange={(evt) => setName(evt.target.value)} required />
        </fieldset>

        <fieldset>
          <select required onChange={(evt) => setCategory(evt.target.value)}>
            <option value={0}>Select a category</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </fieldset>

        {formError && <p>Please fill out all fields.</p>}

        <button onClick={createNewList}>Create</button>
      </form>
    </>
  )
}
