import React, {Suspense} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

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
            <Route path='/home' element={lazyLoad('pages/Beers')}/>
            <Route path='/detail/:id' element={lazyLoad('pages/BeerDetail')}/>
            <Route path='*' element={<Navigate to="/home"/>} />
        </Routes>
    );
}

export default AppRouter;