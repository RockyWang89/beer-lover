import { useReducer, useEffect} from 'react';
import {HashRouter} from 'react-router-dom';
import axios from 'axios';
import { Layout } from 'antd';
import AppRouter from './router';
import globalContext from './globalContext';
import {reducer, initialState} from './appStates';

const {Header, Footer, Content} = Layout;

function App() {
  //Use useReducer hook and context to manage the state all together out of the components
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
      <Header className='header'>
        <div>
          <h1 className='header-title'>Find The Beers You Love</h1>
        </div>
      </Header>
      <Content className='content'>
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
      <Footer className='footer'>
        <p>Beer Lover -- Copyright &copy; 2022 Rocky Wang</p>
      </Footer>
    </Layout>
  );
}

export default App;
