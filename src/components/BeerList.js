import { useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col, Card, Button } from "antd";
import globalContext from "../globalContext";

function BeerList() {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(globalContext);
    const {Meta} = Card;

    //Jump to the detail page when click on a specific beer
    const goToDetail = useCallback((id)=>navigate(`/detail?id=${id}`));

    //Load 20 more beers from the public API when click the view more button
    const loadNewPage = useCallback(()=>{
        const nextPage = (state.beerList.length/20)+1;
        dispatch({type: "switchLoading"});
        axios({
            method: "get",
            url: `https://api.punkapi.com/v2/beers?page=${nextPage}&per_page=20`
        })
        .then((res)=>{
            dispatch({type: "switchLoading"});
            dispatch({
                type: "setBeerList",
                value: res.data
            });
        });
    }, [state.beerList]);

    //Hide the button while using the searching box
    const loadMoreButton = useMemo(()=>{
        return (state.keyword||state.brewedBefore||state.brewedAfter||state.abvGreaterThan||state.abvLessThan)?
            null:<Button onClick={loadNewPage} loading={state.loading}>View More</Button>;
    }, [state]);

    //Generate the view of the component with useMemo as it should not being affected by any change of the state
    const view = useMemo(()=>{
        return (
            <Row>
                <Row className="wrapper beer-list" gutter={[0,16]}>
                    {
                        state.filteredList.map((item)=>{
                            return (
                                <Col key={item.id} lg={6} sm={24} xs={24} className="gutter-row">
                                    <Card
                                        hoverable
                                        cover={
                                            <div className="beer-card-cover">
                                                <img alt={item.name} src={item.image_url?item.image_url:"https://images.punkapi.com/v2/keg.png"} />
                                            </div>
                                        }
                                        className="beer-card"
                                        onClick={()=>goToDetail(item.id)}
                                    >
                                        <Meta title={item.name} description={item.tagline} className="card-meta"/>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
                <div className="loadmore-button-wrapper">{loadMoreButton}</div>
            </Row>
        );
    },[state.filteredList, state.loading])

    return view;
}

export default BeerList;