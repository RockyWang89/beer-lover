import axios from 'axios';
import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

function BeerDetail() {
    const [beerDetail, setBeerDetail] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const beerId = searchParams.get('id');

    useEffect(()=>{
        axios({
            method: "get",
            url: `https://api.punkapi.com/v2/beers/${beerId}`
        })
        .then((res)=>{
            setBeerDetail(res.data[0]);
        });
    }, []);

    return (
        <div>
            {JSON.stringify(beerDetail)}
        </div>
    );
}

export default BeerDetail;