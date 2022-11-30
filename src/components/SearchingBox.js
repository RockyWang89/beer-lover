import { useContext } from "react";
import globalContext from "../globalContext";

function SearchingBox(props) {
    const {state, dispatch} = useContext(globalContext);

    function handleChange(event) {
        const {name, value} = event.target;
        dispatch({
            type: "updateConditions",
            value: {
                key: name,
                value: value
            }
        });
    }

    // console.log("searching box rendered")
    return (
        <div>
            <div>
                <input type="text" name="keyword" placeholder="Please input a keyword" value={state.keyword} onChange={handleChange} />&nbsp;
                <button onClick={()=>props.updateListView()}
                >Search</button>
            </div>
            <div>
                <h4>Year of first brewing</h4>
                <input type="month" name="brewedAfter" value={state.brewedAfter} onChange={handleChange} /> To <input type="month" name="brewedBefore" value={state.brewedBefore} onChange={handleChange} />
            </div>
            <div>
                <h4>Alcohol degree</h4>
                <input type="text" name="abvGreaterThan" value={state.abvGreaterThan} onChange={handleChange} /> To <input type="text" name="abvLessThan" value={state.abvLessThan} onChange={handleChange} />
            </div>
        </div>
    );
}

export default SearchingBox;