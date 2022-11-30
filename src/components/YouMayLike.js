import {useContext, useCallback, useEffect} from 'react';
import axios from 'axios';
import globalContext from '../globalContext';

function YouMayLike(props) {
    const {state, dispatch} = useContext(globalContext);

    const getRandomIndex = useCallback((listLength)=>{
        return Math.floor(Math.random()*listLength);
    }, []);
    
    const jumpTo = useCallback(id => {
        props.setSearchParams({id:id});
    });

    const buildSuggestedList = useCallback((arr, n)=>{
        const arrLength = arr.length;
        let resultList = [];
        if(arrLength > n) {
            for(let i=0; i<n; i++) {
                let index = getRandomIndex(arr.length);
                resultList.push(arr.splice(index,1)[0]);
            }
        }
        else {
            resultList = arr;
        }
        console.log(resultList);
        return resultList;
    }, []);

    useEffect(()=>{
        if(state.beerDetail.abv) {
            axios({
                method: "get",
                url: `https://api.punkapi.com/v2/beers?abv_gt=${Number(state.beerDetail.abv)-0.2}&abv_lt=${Number(state.beerDetail.abv)+0.2}`
            })
            .then((res)=>{
                const fullList = res.data.filter(item => item.id !== state.beerDetail.id);
                dispatch({
                    type: "setSuggestedList",
                    value: buildSuggestedList(fullList, 4)
                });
            });
        }
    }, [state.beerDetail]);

    return (
        <div>
            <ul>
                {/* <li><a onClick={()=>jumpTo(4)}>beer 4</a></li>
                <li><a onClick={()=>jumpTo(5)}>beer 5</a></li>
                <li><a onClick={()=>jumpTo(6)}>beer 6</a></li> */}
                {state.suggestedList.map(item => <li key={item.id}><a onClick={()=>jumpTo(item.id)}>{item.name}</a></li>)}
            </ul>
        </div>
    );
}

export default YouMayLike;