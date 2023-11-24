import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

// ! we can provide some value to the createContext (std, num, obj, arr) and it will be available through all the components
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});

// ! reducer function
// state here is like the prev state in useState
const cartReducerFunc = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    console.log('state.items: ', state.items);
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload);
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);

      console.log('product: ', product);
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      items: updatedItems,
    };
  } else if (action.type === 'UPDATE_ITEM') {
    // reducer`s state is a snapshot of all state
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex((item) => item.id === action.payload.productId);

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
};

const CartContextProvider = ({ children }) => {
  // ! reducer
  const [cartState, cartDispatch] = useReducer(cartReducerFunc, {
    items: [],
  });

  function handleAddItemToCart(id) {
    cartDispatch({
      // ! Here we say that trigger the func with ADD_ITEM mark in the main reducer function
      type: 'ADD_ITEM',
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    cartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId,
        amount,
      },
    });
  }

  const contextValue = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
