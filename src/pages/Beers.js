import {useEffect, useContext, useMemo, useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import globalContext from '../globalContext';
import SearchingBox from '../components/SearchingBox';

function Beers() {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(globalContext);
    var [listView, setListView] = useState([]);

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'https://api.punkapi.com/v2/beers'
        })
        .then((res)=>{
            dispatch({
                type: "setBeerList",
                value: res.data
            });
        })
    }, []);

    useEffect(()=>{
        setListView(filteredList.map((item)=>{
            return <li key={item.id} onClick={()=>goToDetail(item.id)}>{item.name}</li>
        }));
    }, [state.beerList]);

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

    const goToDetail = useCallback((id)=>navigate(`/detail?id=${id}`), []);

    const updateListView = useCallback(()=>{
        setListView(filteredList.map((item)=>{
            return <li key={item.id} onClick={()=>goToDetail(item.id)}>{item.name}</li>
        }));
    }, [state]);

    // function goToDetail(id) {
    //     navigate(`/detail?id=${id}`);
    // }

    // console.log("Beers comp rendered")
    return (
        <div>
            <SearchingBox updateListView={updateListView}/>
            <ul>
                {listView}
            </ul>
        </div>
    );
}

export default Beers;