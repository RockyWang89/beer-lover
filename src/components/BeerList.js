import { useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import globalContext from "../globalContext";

function BeerList() {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(globalContext);

    const goToDetail = useCallback((id)=>navigate(`/detail?id=${id}`));

    const loadNewPage = useCallback(()=>{
        const nextPage = (state.beerList.length/20)+1;
        axios({
            method: "get",
            url: `https://api.punkapi.com/v2/beers?page=${nextPage}&per_page=20`
        })
        .then((res)=>{
            dispatch({
                type: "setBeerList",
                value: res.data
            });
        });
    }, [state.beerList]);

    const loadMoreButton = useMemo(()=>{
        return (state.keyword||state.brewedBefore||state.brewedAfter||state.abvGreaterThan||state.abvLessThan)?
            null:<button onClick={loadNewPage}>Load More</button>;
    }, [state]);

    const view = useMemo(()=>{
        return (
            <div>
                <ul>
                    {
                        state.filteredList.map((item)=>{
                            return <li key={item.id} onClick={()=>goToDetail(item.id)}>{item.name}</li>
                        })
                    }
                </ul>
                {loadMoreButton}
            </div>
        );
    },[state.filteredList])

    return view;
}

export default BeerList;