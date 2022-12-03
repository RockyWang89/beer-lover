import {useContext, useCallback, useEffect} from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'antd';
import globalContext from '../globalContext';

function YouMayLike(props) {
    const {state, dispatch} = useContext(globalContext);
    const {Meta} = Card;

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
            <h1 className='suggested-beers-title'>You may also like</h1>
            <Row className="wrapper suggested-beers" gutter={[0,16]}>
                {
                    state.suggestedList.map((item)=>{
                        return (
                            <Col key={item.id} lg={6} sm={24} xs={24} className="gutter-row">
                                <Card
                                    hoverable
                                    cover={
                                        <div className="beer-card-cover">
                                            <img alt="Image not found" src={item.image_url?item.image_url:"https://images.punkapi.com/v2/keg.png"} />
                                        </div>
                                    }
                                    className="beer-card"
                                    onClick={()=>jumpTo(item.id)}
                                >
                                    <Meta title={item.name} description={item.tagline} className="card-meta"/>
                                </Card>
                            </Col>
                        );
                    })
                }
            </Row>
        </div>
    );
}

export default YouMayLike;