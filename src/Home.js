import React, {useEffect, useState} from "react";
import "./Home.css";
import Product from "./Product.js";
import ProductRow from './ProductRow.js'
import data from './component/data/Data.json'
function Home() {
  const [clothing, setClothing] = useState([]);
  const [furniture, setfuniture] = useState([]);
  const [footwear, setfootwear] = useState([]);
  let carr = [];
  let farr = [];
  let ftarr = [];
     useEffect(() => {
    function setClothingCategory(){
      
      data.map((item)=>{
        let productcategory = item?.product_category_tree
        productcategory = productcategory.replace('[\"','')
        productcategory = productcategory.replace('"]','')
        

        let res = productcategory.match(/clothing/i)
        if(res){
           carr.push(item)
        }

        let  fres = productcategory.match(/furniture/i)
        if(fres){
           farr.push(item)
        }

        
        let ftres = productcategory.match(/footwear/i)
        if(ftres){
           ftarr.push(item)
        }

        

      })
      setClothing(carr)
      setfootwear(ftarr)
      setfuniture(farr)
    }
      setClothingCategory();
      
    }, []);
    
  return (
    
    <div className="home">
    <ProductRow title="Clothing" items={clothing} />
    <ProductRow title="Furniture" items={furniture} />
    <ProductRow title="Footwear" items={footwear} />
    
    </div>
  );
}

export default Home;

{/* <div className="home__container">
        <img
          className="home__img"
          src="https://www.scoonews.com/uploads/news_images/115837302541583730254.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id="1"
          title="Samsung is a good mobile phone."
          price={200.00}
          rating={3}
          image="https://thebookcoverdesigners.com/wp-content/uploads/2017/06/A-Boy-In-Winter_Rachel-Seiffert.jpg"
        />
        <Product
          id="2"
          title="Samsung is a good mobile phone."
          price={200.00}
          rating={5}
          image="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/11/attachment_85920031-e1510349848827.jpg?auto=format&q=60&fit=max&w=930"  />

      </div>
      <div className="home__row">
        <Product
          id="3"
          title="Samsung is a goood phone."
          price={200.00}
          rating={4}
          image="https://thebookcoverdesigners.com/wp-content/uploads/2017/06/A-Boy-In-Winter_Rachel-Seiffert.jpg"
        />
        <Product
          id="4"
          title="Samsung is a good mobile phone."
          price={200.00}
          rating={2}
          image="https://thebookcoverdesigners.com/wp-content/uploads/2017/06/A-Boy-In-Winter_Rachel-Seiffert.jpg"
        />
        <Product
          id="5"
          title="Samsung is a good mobile phone."
          price={200.00}
          rating={5}
          image="https://thebookcoverdesigners.com/wp-content/uploads/2017/06/A-Boy-In-Winter_Rachel-Seiffert.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id="6"
          title="Samsung is a good mobile phone."
          price={200.00}
          rating={1}
          image="https://thebookcoverdesigners.com/wp-content/uploads/2017/06/A-Boy-In-Winter_Rachel-Seiffert.jpg"
        />
      </div> */}