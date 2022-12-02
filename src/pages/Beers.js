import SearchingBox from '../components/SearchingBox';
import BeerList from '../components/BeerList';
import {Row, Col} from 'antd';

function Beers() {

    return (
        <div>
            <SearchingBox />
            <BeerList />
        </div>
    );
}

export default Beers;