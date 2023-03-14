import { createSelector } from "reselect";

const selectCart= state => state.cart;

export const selectCartItems= createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const SelectCartHidden= createSelector(
    [selectCart],
    cart => cart.hidden
)

export const SelectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity,cartItem) => accumulatedQuantity+ cartItem.quantity,0
    ) 
)

export const SelectCartTotal= createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (cartTotal,cartItem) => cartTotal+ cartItem.quantity*cartItem.price,0
    ) 

)