import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { useParams } from "react-router-dom";

const ShopCategory = (props) => {
  const { subCategory } = useParams();
  const [allproducts, setAllProducts] = useState([]);
  const [displayedProductsCount, setDisplayedProductsCount] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchInfo = () => { 
    fetch('https://1ab1-2800-98-1116-780-f9ba-be07-9e81-945e.ngrok-free.app/allproductsDisplay') 
      .then((res) => res.json()) 
      .then((data) => {
        setAllProducts(data);
        setDisplayedProducts(data.slice(0, productsPerPage));
      });
  }

    useEffect(() => {
      fetchInfo();
    }, [])
    console.log(subCategory);
    
    useEffect(() => {
      const filteredProducts = allproducts.filter(item => Number(subCategory) === item.id_categoria);
      setDisplayedProductsCount(filteredProducts.length);
      setDisplayedProducts(filteredProducts.slice(0, productsPerPage));
      setCurrentPage(1);
    }, [allproducts, subCategory]);

    const handleLoadMore = () => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const nextProducts = allproducts
        .filter(item => Number(subCategory) === item.id_categoria)
        .slice(startIndex, endIndex);
      setDisplayedProducts(prevProducts => [...prevProducts, ...nextProducts]);
      setCurrentPage(nextPage);
    };

    return (
      <div className="shopcategory">
        <img src={props.banner} className="shopcategory-banner" alt="" />
        <div className="shopcategory-indexSort">
          <p><span>Showing {currentPage === 1 ? 1 : (currentPage - 1) * productsPerPage + 1} - {Math.min(currentPage * productsPerPage, displayedProductsCount)}</span> out of {displayedProductsCount} Products</p>
          <div className="shopcategory-sort">Sort by  <img src={dropdown_icon} alt="" /></div>
        </div>
        
        <div className="shopcategory-products">
          {displayedProducts.map((item,i) => (
            <Item 
              key={item.id}
              id={item.id}
              name={item.nombre_producto}
              image={item.imagen_producto1}
              description={item.descripcion_producto}
              idcategoria={item.id_categoria}
            />
          ))}
        </div>
        
        {displayedProducts.length < displayedProductsCount && (
          <div className="shopcategory-loadmore">
            <button onClick={handleLoadMore}>Explore More</button>
          </div>
        )}
      </div>
    );
  };
  
  export default ShopCategory;
