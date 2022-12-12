import React, {Suspense} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Beers from '../pages/Beers';

//Lazy loading function
function lazyLoad(path) {
    const LazyComponent = React.lazy(()=>import(`../${path}`));
    return (
        <Suspense fallback="Loading...">
            <LazyComponent />
        </Suspense>
    );
}

function AppRouter() {
    return (
        <Routes>
            {/* home page route, it doesn't use lazy loading as lazy loading will lead to the lost of state and contradict controlled components */}
            <Route path='/home' element={<Beers />}/>
            {/* detail page route */}
            <Route path='/detail' element={lazyLoad('pages/BeerDetail')}/>
            <Route path='*' element={<Navigate to="/home"/>} />
        </Routes>
    );
}

export default AppRouter;