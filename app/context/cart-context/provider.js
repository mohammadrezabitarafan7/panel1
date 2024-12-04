'use client'
import { useState } from 'react'
import { CartContext } from './context.js'

const CartProvider = ({ children }) => {

    const [count, setCount] = useState()

    const UpdateCart = () => {

        setCount(count + 1)
    }

    return (
        <CartProvider.Provider value={{ count, UpdateCart }} >
            {children}
        </CartProvider.Provider>
    )


}
export default CartProvider