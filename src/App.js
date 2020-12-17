import "./App.css";
import Footer from './Footer.js'
import { useEffect } from "react";
import Category from "./Category.js";
import Header from "./Header.js";
import Home from "./Home.js";
import Payment from "./Payment.js";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { Elements } from "@stripe/react-stripe-js/";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./Orders.js";
import Subheader from "./Subheader";
const promise = loadStripe(
  "pk_test_51HxpnnIWU5hypJVnl5RPY4OitGG1mNzFGjLMQHYYAStYp3blgxb2uhMHOFNoGwtccBclBzXauraQyZzx9t5rBwQK00nrOBOpjb"
);

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Switch>
          <Route path="/category/:title" >
          <Subheader />
           <Category />
           <Footer />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Checkout />
          </Route>

          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
          <Subheader />
            <Home />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
