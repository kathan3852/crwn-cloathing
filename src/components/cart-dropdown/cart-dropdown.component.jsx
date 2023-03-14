import React from "react";
import './cart-dropdown.styles.css'
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.action";

const CartDropdown = ({cartItems,dispatch}) => {
    const navigate= useNavigate()
    return (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
            cartItems.length?
            (cartItems.map( cartItem => <CartItem key={cartItem.id} item={cartItem} />)) :
            (<span className="empty-message">Your Cart Is Empty</span>)
            }
        </div>
        <CustomButton onClick={() => {
            navigate('/checkout');
            dispatch(toggleCartHidden());
          }  } >GO TO CHECKOUT</CustomButton>
    </div>
)}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default connect(mapStateToProps)(CartDropdown);
