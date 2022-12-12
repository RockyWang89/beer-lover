import axios from 'axios';
import {useContext, useEffect} from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {Row, Col, Divider, Button} from 'antd';
import globalContext from '../globalContext';
import YouMayLike from '../components/YouMayLike';

function BeerDetail() {
    const [searchParams, setSearchParams] = useSearchParams();
    const beerId = searchParams.get('id');
    const {state, dispatch} = useContext(globalContext);
    const navigate = useNavigate();

    //retrieve the specific beer detail via beer id passed through the query in the link
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
                <Button type='default' onClick={()=>navigate('/home')} className="goback-btn">Go Back</Button>
            </div>
            {/* {JSON.stringify(state.beerDetail)} */}
            <Row className='wrapper'>
                <Col lg={12} sm={24} xs={24}>
                    <div className='image-holder'>
                        <img alt={state.beerDetail.name} src={state.beerDetail.image_url?state.beerDetail.image_url:"https://images.punkapi.com/v2/keg.png"}/>
                    </div>
                </Col>
                <Col lg={12} sm={24} xs={24}>
                    <div className='text-holder'>
                        <h1>{state.beerDetail.name}</h1>
                        <p>{state.beerDetail.description}</p>
                        <Divider orientation='left' orientationMargin={0}>ALCOHOL DEGREE</Divider>
                        <p>{state.beerDetail.abv}%</p>
                        <Divider orientation='left' orientationMargin={0}>BITTERNESS</Divider>
                        <p>{state.beerDetail.ibu}</p>
                        <Divider orientation='left' orientationMargin={0}>FIRST BREWED IN</Divider>
                        <p>{state.beerDetail.first_brewed}</p>
                        <Divider orientation='left' orientationMargin={0}>MALT</Divider>
                        <p>{state.beerDetail.ingredients&&state.beerDetail.ingredients.malt.map((item,index)=>index<(state.beerDetail.ingredients.malt.length-1)?`${item.name}, `:item.name)}</p>
                        <Divider orientation='left' orientationMargin={0}>HOPS</Divider>
                        <p>{state.beerDetail.ingredients&&state.beerDetail.ingredients.hops.map((item,index)=>index<(state.beerDetail.ingredients.hops.length-1)?`${item.name}, `:item.name)}</p>
                        <Divider orientation='left' orientationMargin={0}>YEAST</Divider>
                        <p>{state.beerDetail.ingredients&&state.beerDetail.ingredients.yeast}</p>
                        <Divider orientation='left' orientationMargin={0}>FOOT PAIRING</Divider>
                        <p>{state.beerDetail.food_pairing&&state.beerDetail.food_pairing.map((item, index)=>index<(state.beerDetail.food_pairing.length-1)?`${item}, `:item)}</p>
                    </div>
                </Col>
            </Row>
            <YouMayLike setSearchParams={setSearchParams}/>
        </div>
    );
}

export default BeerDetail;