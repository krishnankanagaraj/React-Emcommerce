import type from '../types/product.types'

const initialState={
   productData:null 
}

const productReducer=(state = initialState, action = {}) => {
    switch (action.type) {
        case type.SAVE_PRODUCTS:
            return {
                ...state,
                productData: action.data
            }
        default:
            return state
    }
}
export default productReducer