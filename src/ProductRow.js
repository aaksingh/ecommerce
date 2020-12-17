import React from "react";
import Product from "./Product.js";
import { Link, useHistory } from "react-router-dom";
import "./ProductRow.css";
import { Button } from "@material-ui/core";
import Category from "./Category.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function ProductRow({ title, items }) {
  const history = useHistory();
  let categoryitem = items.slice(0, 10);

  function viewallitems() {
    history.push(`/category/${title}`);
  }
  return (
    <div className="productrow">
      <div className="productrow__header">
        <h2>{title}</h2>
        <div className="productrow__button">
          <Button
            variant="contained"
            color="primary"
            target="_blank "
            onClick={viewallitems}
          >
            Show All
            
          </Button>
        </div>
      </div>
      <div className="productrow__row">
        {categoryitem.map((item) => (
          <Product
            id={item?.pid}
            title={item?.product_name}
            image={item?.image}
            price={item?.retail_price}
            rating={Math.floor(Math.random() * 5) + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductRow;
