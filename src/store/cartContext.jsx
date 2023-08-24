import React from "react";

const CartContext=React.createContext({
    items:[],
    totalAmount:null,
    addItems:(item)=>{},
    removeItems:(item)=>{},
    emptyCart:()=>{}
})
export default CartContext;