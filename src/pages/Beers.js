import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Beers() {
    const [beerList, setBeerList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'https://api.punkapi.com/v2/beers'
        })
        .then((res)=>{
            //console.log(res.data);
            setBeerList(res.data);
        })
    }, []);

    function goToDetail(id) {
        navigate(`/detail?id=${id}`);
    }

    return (
        <ol>
            {beerList.map((item)=>{
                return <li key={item.id} onClick={()=>goToDetail(item.id)}>{item.name}</li>
            })}
        </ol>
    );
}

export default Beers;