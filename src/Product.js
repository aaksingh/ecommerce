import React from "react";
import "./Product.css";
import Button from "@material-ui/core/Button"
import { useStateValue } from "./StateProvider";
function Product({id, title, image, price, rating}) {
  const [state, dispatch] = useStateValue();
  //console.log(data[0]?.image.split(",")[0].substring(2))
  
  var imageLink = image.split(",")[0].substring(2);
  
  imageLink = imageLink.substring(0, imageLink.length-1);
  const addToBasket =() =>{
    
    dispatch({
      
      type: 'ADD_TO_BASKET',
      item:{
        id:id,
        title:title,
        image:image,
        price:price,
        rating:rating, 
      },
    })
  }
  return (
    <div className="product">
      <div className="product__img">
      <img src={imageLink} />
      </div>
      <div className="product__info">
      
        <h5>{title}</h5>
        <p className="product__price">
          <h4>₹ </h4>
          <strong>{price}</strong> 
        </p>
        
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>&#9733;</p>
            ))}
        </div>
      </div>
      
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
