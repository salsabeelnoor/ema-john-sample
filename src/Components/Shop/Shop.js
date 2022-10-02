import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]); // cart state
    useEffect( () => {
        fetch('products.json')
        .then(res=> res.json())
        .then(data => setProducts(data));
    }, []);
    const HandleAddToCart = (product) => {
        console.log(product);
        // cart.push(product);
        const newCart = [...cart, product]; //cart er product er shathe notun product add
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
               {
                products.map(product => <Product 
                key={product.id}
                product={product}
                handleAddToCart={HandleAddToCart}
                ></Product>)
               }
            </div>
            <div className="cart-container">
                <h4>Order Summary</h4>
                <p>Selected Items: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;