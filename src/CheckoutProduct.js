import { waitFor } from "@testing-library/react";
import React,{useState} from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
function CheckoutProduct({ id, image, title, price, rating }) {
  const [isActive, changeActive]= useState(false);
  const [{basket}, dispatch] = useStateValue();
  
  const removeFromBasket = () =>{
    changeActive(true);
    
    dispatch({
      type : "REMOVE_FROM_BASKET",
      id : id,
    })
  }
  
  return (

    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
            {Array(rating)
            .fill()
            .map(()=>(
                  <p>&#11088;</p>
            ))}
        </div>
        <button onClick={removeFromBasket}>Remove From Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
