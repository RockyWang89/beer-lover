import SearchingBox from '../components/SearchingBox';
import BeerList from '../components/BeerList';
import ScrollToTop from 'react-scroll-to-top';

function Beers() {

    return (
        <div>
            <SearchingBox />
            <BeerList />
            <ScrollToTop smooth/>
        </div>
    );
}

export default Beers;