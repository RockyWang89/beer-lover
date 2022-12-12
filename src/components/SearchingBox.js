import { useContext, useMemo, useEffect, useCallback } from "react";
import globalContext from "../globalContext";
import {Row, Col, Input, Button} from 'antd';

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

    //update the filteredList in state when the beerList updates
    useEffect(()=>{
        dispatch({
            type: "setFilteredList",
            value: filteredList
        });
    }, [state.beerList]);

    //build the inputs as controlled components
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
        <Row align="center">
            <Col className="searching-input-wrapper">
                <div>
                    <h4>Key word</h4>
                    <Input type="text" name="keyword" placeholder="Please input a keyword" value={state.keyword} onChange={handleChange} />
                </div>
            </Col>
            <Col className="searching-input-wrapper">
                <div>
                    <h4>Year of first brewing</h4>
                    <Input type="month" name="brewedAfter" value={state.brewedAfter} onChange={handleChange} className="month-input" /> To <Input type="month" name="brewedBefore" value={state.brewedBefore} onChange={handleChange} className="month-input" />
                </div>
            </Col>
            <Col className="searching-input-wrapper">
                <div>
                    <h4>Alcohol degree</h4>
                    <Input type="text" name="abvGreaterThan" value={state.abvGreaterThan} onChange={handleChange} className="abv-input" /> To <Input type="text" name="abvLessThan" value={state.abvLessThan} onChange={handleChange} className="abv-input" />
                </div>
            </Col>
            <Col className="searching-input-wrapper">
                <Button 
                    onClick={()=>{
                        dispatch({
                            type: "setFilteredList",
                            value: filteredList
                        });
                    }}
                    className="search-button"
                >Search</Button>
            </Col>
        </Row>
    );
}

export default SearchingBox;