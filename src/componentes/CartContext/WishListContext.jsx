/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
    const [wishList, setWishList] = useState([]);
    const config = {
    headers: { token: `${localStorage.getItem("token")}` },
    };
    async function addProductToWishList(productId) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{ productId: productId },config)
            .then((response) => {
            return response;
            })
            .catch((error) => {
            return error;
            });
    }

    async function getLoggedUserWishList() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
            config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
    async function deleteWishListItem(productId){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            config )
        .then((response) => {
            return response;
            })
            .catch((error) => {
            return error;});
    }

    return (
        <WishListContext.Provider
        value={{
            addProductToWishList,
            getLoggedUserWishList,
            setWishList,
            deleteWishListItem,
        }}
        >
        {children}
        </WishListContext.Provider>
    );
};