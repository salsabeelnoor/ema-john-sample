import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb, getStoredCart } from '../Utilities/fakedb';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]); // cart state
    useEffect( () => {
        fetch('products.json')
        .then(res=> res.json())
        .then(data => setProducts(data));
    }, []);

    useEffect(() => {
        //retrieve data from local storage
        const storedCart = getStoredCart(); //returns an object
        const savedCart = [];
        for(const id in storedCart){ //loop through object
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products]);

    const HandleAddToCart = (selectedProduct) => {
        // console.log(product);
        // cart.push(product);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        // const newCart = [...cart, selectedProduct]; //cart er product er shathe notun product add
        setCart(newCart);
        addToDb(selectedProduct.id);
        // console.log(newCart);
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;