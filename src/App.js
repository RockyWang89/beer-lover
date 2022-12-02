import { useReducer, useEffect} from 'react';
import {HashRouter} from 'react-router-dom';
import axios from 'axios';
import { Layout } from 'antd';
import AppRouter from './router';
import globalContext from './globalContext';
import {reducer, initialState} from './appStates';

const {Header, Footer, Content} = Layout;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Get initial beer data from API
  useEffect(()=>{
    axios({
        method: 'get',
        url: `https://api.punkapi.com/v2/beers?page=1&per_page=40`
    })
    .then((res)=>{
        dispatch({
            type: "setBeerList",
            value: res.data
        });
    })
  }, []);

  return (
    <Layout>
      <Header style={{backgroundColor: "transparent"}}>
        <div>
          <h1>Find Beers You Love</h1>
        </div>
      </Header>
      <Content>
        <globalContext.Provider 
          value={
            {
              state,
              dispatch,
            }
          }
        >
          <HashRouter>
            <AppRouter></AppRouter>
          </HashRouter>
        </globalContext.Provider>
      </Content>
      <Footer>
        <div>
          This is Footer
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
