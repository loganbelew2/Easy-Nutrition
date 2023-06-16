export const SearchFood = ({ setterFunction, listArray, setList}) => {

    return (<>
        <h3>Which list will you be adding to?</h3>
        <select required onChange={(evt) => setList(evt.target.value)}>
            {
                listArray.length === 0 ? (<option value={0}> click the create List Link</option>) :
                    (<option value={0}>please select a list</option>)
            }

            {
                listArray.map(
                    (list) => (<option value={list.id} key={`list--${list.id}`}>{list.name}: {list?.category?.name}</option>)
                )
            }
        </select>
        <h1>Build your List of Food</h1>
        <input required type="text" placeholder="chicken"
            onChange={(change) => {
                setterFunction(change.target.value)
            }}
        />
    </>
    )





}