 /* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ContextProvider, { Context } from '../../Context/UserContext';
import { CartContext } from '../CartContext/CartContext';
export default function Navbar() {
    let {UserToken , setUserToken} = useContext(Context)
    let  {cartNum} = useContext(CartContext)
    console.log(UserToken);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const navigate = useNavigate()
    function logOut(){
        setUserToken("");
        localStorage.removeItem("token")
        navigate('/login')
    }
return (
    <>
    <nav className='bg-gray-100 top-0 left-0 right-0 py-2 z-50'>
        <div className=' justify-between w-[85%] mx-auto py-2 flex flex-col lg:flex-row items-center'>
        <div className="absolute pt-4 inset-y-0 right-0 flex lg:hidden cursor-pointer" onClick={toggleMenu}>
            <i className="fa-solid fa-bars mx-5 mt-1 text-2xl"></i>
        </div>
        <div>
        <i className="fa-solid fa-cart-shopping text-green-700 text-2xl"></i> <p className='text-lg text-slate-900 fa-solid mx-1'>FreshCart</p>
        </div>
        <div className={`flex flex-col lg:flex-row items-center ${isMenuOpen ? 'hidden' : 'block'}`}>
            {UserToken && <ul className='flex flex-col lg:flex-row items-center text-center'>
                <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900" to="">Home</NavLink></li>
                <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900" to="cart">Cart</NavLink></li>
                <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900" to="wishList">Wish List</NavLink></li>
                <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900" to="products">Products</NavLink></li>
                <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900" to="brands">Brands</NavLink></li>
                <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900" to="categories">Categories</NavLink></li>
            </ul> }
        </div>
        <div className={`${isMenuOpen ? 'hidden' : 'block'}`}>
            <ul className='flex flex-col lg:flex-row items-center'>
                
                    {!UserToken && <>
                    <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900" to="login">Login</NavLink></li>
                    <li className='py-2'><NavLink className="mx-2 text-lg text-slate-900" to="register">Register</NavLink></li>
                    </>}
                    {UserToken && <>
                        <li className='my-2'>
                            {cartNum > 0 && (
                                <i className="fa-solid fa-cart-shopping text-gray-700 text-2xl py-1 relative">
                                    <div className='absolute bg-green-700 text-white rounded-md text-center text-sm px-1 top-[-10px] right-[-5px]'>
                                        {cartNum}
                                    </div>
                                </i>
                            )}
                        </li>
                        <li className='py-2'><button onClick={logOut} className="mx-2 text-lg text-slate-900">Logout</button></li></> 
                    }
                </ul> 
            </div>
        </div>
    </nav>
    </>
)}