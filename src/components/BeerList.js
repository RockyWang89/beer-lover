import { useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col, Card } from "antd";
import globalContext from "../globalContext";

function BeerList() {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(globalContext);
    const {Meta} = Card;

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
            null:<a onClick={loadNewPage} className="loadmore-btn">View More</a>;
    }, [state]);

    const view = useMemo(()=>{
        return (
            <Row>
                <Row className="beer-list" gutter={[0,16]}>
                    {
                        state.filteredList.map((item)=>{
                            return (
                                <Col key={item.id} lg={6} sm={24} xs={24} className="gutter-row">
                                    <Card
                                        hoverable
                                        cover={
                                            <div className="beer-card-cover">
                                                <img alt={item.name} src={item.image_url} />
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
    },[state.filteredList])

    return view;
}

export default BeerList;