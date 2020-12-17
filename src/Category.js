import React, { Button, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from './component/data/Data.json'
import Product from './Product.js'
import Sidebar from './Sidebar.js'
import './Category.css'
function Category() {
  const {title} = useParams()
 
  const [citem, setitem] = useState([]);
  let catarr = [];
  
  useEffect(()=>{
   
    function setcategory(){
         
        data.map((item)=>{
            let productcategory = item?.product_category_tree
            
            productcategory = productcategory.replace('[\"','')
            productcategory = productcategory.replace('"]','')
            
    
            let res = productcategory.match(new RegExp(title,"i"))
            if(res){
               catarr.push(item)
              
            }
        })
        setitem(catarr)
    }
    
    setcategory()

  },[])

  return (

    <div className="category"> 
        <div className="category__sidebar">
           <Sidebar />
        </div>
      <div className="category__content">
        {citem.map((items) => (
          <Product
            id={items?.pid}
            title={items?.product_name}
            image={items?.image}
            price={items?.retail_price}
            rating={Math.floor(Math.random() * 5) + 1}
          />
        ))}
      </div>
    </div>
   
  )
}

export default Category;
