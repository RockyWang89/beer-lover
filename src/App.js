import { useReducer } from 'react';
import {HashRouter} from 'react-router-dom';
import AppRouter from './router';
import globalContext from './globalContext';
import {reducer, initialState} from './appStates';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <globalContext.Provider value={{state, dispatch}}>
      <HashRouter>
        <AppRouter></AppRouter>
      </HashRouter>
    </globalContext.Provider>
  );
}

export default App;
