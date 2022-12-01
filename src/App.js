import { useReducer, useEffect} from 'react';
import {HashRouter} from 'react-router-dom';
import AppRouter from './router';
import globalContext from './globalContext';
import {reducer, initialState} from './appStates';
import axios from 'axios';

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
  );
}

export default App;
