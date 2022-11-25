import axios from 'axios';
import {useContext, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import globalContext from '../globalContext';

function BeerDetail() {
    const [searchParams, setSearchParams] = useSearchParams();
    const beerId = searchParams.get('id');
    const {state, dispatch} = useContext(globalContext);

    useEffect(()=>{
        axios({
            method: "get",
            url: `https://api.punkapi.com/v2/beers/${beerId}`
        })
        .then((res)=>{
            dispatch({
                type: "setBeerDetail",
                value: res.data[0]
            });
        });
    }, []);

    return (
        <div>
            {JSON.stringify(state.beerDetail)}
        </div>
    );
}

export default BeerDetail;