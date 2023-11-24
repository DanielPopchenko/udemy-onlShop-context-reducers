import CartContextProvider from './store/shopping-cart.jsx';
import Product from './components/Product.jsx';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Counter from './components/Counter.jsx';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        <ul id="products">
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </ul>
      </Shop>

      <Counter />
    </CartContextProvider>
  );
}

export default App;
