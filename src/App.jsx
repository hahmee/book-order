
import './App.css'
import Header from "./components/Header.jsx";
import Books from "./components/Books.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";
import Cart from "./components/Cart.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import Checkout from "./components/Checkout.jsx";
function App() {

  return (
      <UserProgressContextProvider>
        <CartContextProvider>
            <Header/>
            <Books/>
            <Cart/>
            <Checkout/>
        </CartContextProvider>
      </UserProgressContextProvider>
  )
}

export default App
