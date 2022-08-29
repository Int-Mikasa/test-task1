import { useEffect, useState } from 'react';
import './App.css'
import Twitter from './component/Twitter';
import Badge from './component/Badge';
import Loader from './component/Loader';

const filterTypes = {
  price: 'price',
  count: 'count',
}

function App() {
  const [positions, setPositions] = useState([]);
  const [filter, setFilter] = useState(filterTypes.price);

    useEffect(async () => {
      try {
        const resp = await fetch('http://localhost:4000/posts');
        const data = await resp.json();
        setPositions(data)
      } catch (e) {
        throw new Error(e);
      }
    }, []);

    function sortPositions(filterType) {
      setFilter(filterType);
      setPositions(prev => prev.sort((a, b) => {
        if (filter === filterTypes.price) {
          return a.price > b.price ? 1 : -1
        }

        if (filter === filterTypes.count) {
          return a.count > b.count ? 1 : -1
        }

        return a
      }))
    }

  return (
    <div>
      <div className="App">
        {positions.map((el, index) => <div className='position-wrapper' key={el.id}>
          <div>{ index } index</div>
          <div>{ el.title } title</div>
          <div>{ el.price } price</div>
          <div>{ el.count } count</div>
        </div>)}

        <div>
          <label>
            price
            <input type="radio" onChange={() => sortPositions(filterTypes.price)} checked={filter === filterTypes.price} />
          </label>

          <label>
            count
            <input type="radio" onChange={() => sortPositions(filterTypes.count)} checked={filter === filterTypes.count} />
          </label>
        </div>
      </div>

      <div>
        <Twitter username='dsdsd'>
          { (user) => user ? <Badge/> : <Loader/> }
      </Twitter>
      </div>
    </div>
  );
}

export default App;
