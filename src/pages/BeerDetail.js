import axios from 'axios';
import {useContext, useEffect} from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';
import globalContext from '../globalContext';
import YouMayLike from '../components/YouMayLike';

function BeerDetail() {
    const [searchParams, setSearchParams] = useSearchParams();
    const beerId = searchParams.get('id');
    const {state, dispatch} = useContext(globalContext);
    const navigate = useNavigate();

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
    }, [beerId]);

    // console.log("beer detail rendered");
    return (
        <div>
            <div>
                <a onClick={()=>navigate('/home')}>Back</a>
            </div>
            {JSON.stringify(state.beerDetail)}
            <YouMayLike setSearchParams={setSearchParams}/>
        </div>
    );
}

export default BeerDetail;