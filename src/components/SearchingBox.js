import { useContext, useMemo, useEffect, useCallback } from "react";
import globalContext from "../globalContext";

function SearchingBox() {
    const {state, dispatch} = useContext(globalContext);

    //Conditional searching: use useMemo to filter the displaying list of beers
    const filteredList = useMemo(()=>{
        const upperKeyword = state.keyword.toUpperCase();
        return state.beerList.filter(item => {
            const yearBrewed = item.first_brewed?item.first_brewed.split('/')[1]+'-'+item.first_brewed.split('/')[0]:false;
            return (
                (
                    item.name.toUpperCase().includes(upperKeyword)||
                    item.tagline.toUpperCase().includes(upperKeyword)||
                    item.description.toUpperCase().includes(upperKeyword)||
                    item.ingredients.malt.some(maltItem => maltItem.name.toUpperCase().includes(upperKeyword))||
                    item.ingredients.hops.some(hopsItem => hopsItem.name.toUpperCase().includes(upperKeyword))||
                    item.ingredients.yeast.toUpperCase().includes(upperKeyword)
                )&&
                (
                    yearBrewed?(state.brewedBefore?yearBrewed>=state.brewedAfter&&yearBrewed<=state.brewedBefore:yearBrewed>=state.brewedAfter):false
                )&&
                (
                    item.abv?(state.abvLessThan?item.abv>=state.abvGreaterThan&&item.abv<=state.abvLessThan:item.abv>=state.abvGreaterThan):false
                )
            )
        });
    }, [state]);

    useEffect(()=>{
        dispatch({
            type: "setFilteredList",
            value: filteredList
        });
    }, [state.beerList]);

    const handleChange = useCallback((event) => {
        const {name, value} = event.target;
        dispatch({
            type: "updateConditions",
            value: {
                key: name,
                value: value
            }
        });
    });

    return (
        <div>
            <div>
                <input type="text" name="keyword" placeholder="Please input a keyword" value={state.keyword} onChange={handleChange} />&nbsp;
                <button onClick={()=>{
                    dispatch({
                        type: "setFilteredList",
                        value: filteredList
                    });
                }}
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