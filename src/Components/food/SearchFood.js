export const SearchFood = ({ searchContent, listArray, setList }) => {

    return (<>
        <div className="select-list">
            <h3 className="searchFood--header">Build your List of Food</h3>
            <div className="selectList">

                <h5>Which list will you be adding to?</h5>
                <select className="select" required onChange={(evt) => setList(evt.target.value)}>
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
            </div>

            <input id="search-input" required type="text" placeholder="chicken" className="input" autoComplete="off"
                onChange={(change) => {
                    searchContent(change.target.value)
                }}
            />
        </div>
    </>
    )





}