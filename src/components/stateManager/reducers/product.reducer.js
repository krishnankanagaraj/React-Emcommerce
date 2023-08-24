import type from '../types/product.types'

const initialState={
   productData:null 
}

export default (state = initialState, action = {}) => {
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
