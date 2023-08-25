import { useReducer } from "react";
import CartContext from "./cartContext";

const defaultCartValues={
    items:[],
    totalAmount:null

}


const cartReducer=(state,action)=>{
    let updatedItems;
    if(action.type==='ADD'){
        console.log(action.item.quantity)
        const updatedAmout=Number(state.totalAmount)+Number(action.item.price*action.item.quantity);
        const existingItemIndex=state.items.findIndex((t)=>t.id===action.item.id)
        let existingItem=state.items[existingItemIndex];
        if(existingItem){
           const updatedItem={...existingItem,quantity:Number(existingItem.quantity)+Number(action.item.quantity)}
            updatedItems=[...state.items]
            updatedItems[existingItemIndex]=updatedItem
        }
        else{
            updatedItems=[...state.items,action.item]
        }
        
        return {items:updatedItems,totalAmount:updatedAmout}
    }
    if(action.type==="REMOVE"){     
        const updatedAmout=Number(state.totalAmount)-Number(action.item.price);
        const existingItemIndex=state.items.findIndex((t)=>t.id===action.item.id)
        let existingItem=state.items[existingItemIndex];      
        if(existingItem.quantity>1)
        {
            let updatedItem={...existingItem,quantity:existingItem.quantity-1}
            updatedItems=[...state.items]
            updatedItems[existingItemIndex]=updatedItem;
        }
        else
        {
            updatedItems=state.items.filter(item=>item.id!==action.item.id)
        }
        return {items:updatedItems,totalAmount:updatedAmout}
    }
    if(action.type==='EMPTY'){
        return defaultCartValues
    }
    console.log('end')
      return defaultCartValues
    
}

const CartProvider = (props)=>{

    const addItemHandler=(item)=>{
        dispatchCartState({type:'ADD',item:item})
    }
    const removeItemHandler=(item)=>{
        console.log('remove')
        dispatchCartState({type:'REMOVE',item:item})
    }
    const emptyCartHandeler=()=>{
        dispatchCartState({type:'EMPTY'})
    }
    const[cartState,dispatchCartState]=useReducer(cartReducer,defaultCartValues)

    
    return(
        <CartContext.Provider value={{
            items:cartState.items,
            totalAmount:cartState.totalAmount,
            addItems:addItemHandler,
            removeItems:removeItemHandler,
            emptyCart:emptyCartHandeler
        }}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider