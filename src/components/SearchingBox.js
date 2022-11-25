import { useState, useContext } from "react";
import globalContext from "../globalContext";

function SearchingBox() {
    const {state, dispatch} = useContext(globalContext);
    const [conditions, setConditions] = useState({
        keyword: "",
        brewedBefore: "",
        brewedAfter: "",
        abvGreaterThan: "",
        abvLessThan: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setConditions((prevConditions) => {
            return ({
                ...prevConditions,
                [name]: value
            });
        });
    }

    return (
        <div>
            <div>
                <input type="text" name="keyword" placeholder="Please input a keyword" value={conditions.keyword} onChange={handleChange} />&nbsp;
                <button onClick={()=>{
                    dispatch({
                        type: "updateConditions",
                        value: conditions
                    });
                }}
                >Search</button>
            </div>
            <div>
                <h4>Year of first brewing</h4>
                <input type="month" name="brewedAfter" value={conditions.brewedAfter} onChange={handleChange} /> To <input type="month" name="brewedBefore" value={conditions.brewedBefore} onChange={handleChange} />
            </div>
            <div>
                <h4>Alcohol degree</h4>
                <input type="text" name="abvGreaterThan" value={conditions.abvGreaterThan} onChange={handleChange} /> To <input type="text" name="abvLessThan" value={conditions.abvLessThan} onChange={handleChange} />
            </div>
        </div>
    );
}

export default SearchingBox;