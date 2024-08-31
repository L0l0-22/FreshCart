/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(0);

export default function CartContextProvider(props) {
    const [cartId , setCartId] = useState(0);
    const config = {
    headers: { token: `${localStorage.getItem("token")}` },
    };
    const [cartNum , setCartNum]= useState(0)
    async function addProductToCard(productId) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{ productId: productId },config)
            .then((response) => {
            return response;
            })
            .catch((error) => {
            return error;
            });
    }
    async function getLoggedUserCart() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/cart', config)
            .then((response) => {
                setCartNum(response.data.numOfCartItems);
                setCartId(response.data.data._id);
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
    async function updateCart(productId , newCount){
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count : newCount} ,config )
        .then((response) => {
            return response;
            })
            .catch((error) => {
            return error;});
    }
    async function deleteCartItem(productId){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,config )
        .then((response) => {
            return response;
            })
            .catch((error) => {
            return error;});
    }
    async function deleteAllCart(){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,config )
        .then((response) => {
            return response;
            })
            .catch((error) => {
            return error;});
    }
    async function CheckOutCart(cartId , url , formData){
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {shippingAddress : formData} , config )
        .then((response) => {
            return response;
            })
            .catch((error) => {
            return error;});
    }
    useEffect(()=>{
        getLoggedUserCart()
    })
    return <CartContext.Provider 
    value={{ addProductToCard , 
    getLoggedUserCart , 
    updateCart ,
    deleteCartItem , 
    deleteAllCart , 
    CheckOutCart , 
    cartId ,
    cartNum,
    setCartNum,
    }}>
        {props.children}
    </CartContext.Provider>;
    }