export const SearchFood = ({setterFunction}) => {

    return (<>
        <h1>Build your List of Food</h1>
        <input type="text" placeholder="chicken"
        onChange={(change) => {
            setterFunction(change.target.value)
        }}
        />
        </>
    )




    
}