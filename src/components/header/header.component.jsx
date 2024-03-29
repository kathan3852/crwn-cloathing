import React from "react";
import { HeaderContainer, OptionsContainer, OptionLink, LogoContainer} from "./header.styles";
import {ReactComponent as Logo} from '../../assets/crown.svg'
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { SelectCurrentUser } from "../../redux/user/user.selectors";
import { SelectCartHidden } from "../../redux/cart/cart.selectors";

const Header= ({currentUser,hidden}) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/shop'>CONTACT</OptionLink>
            {
                currentUser?
                (<OptionLink as='div' onClick={() =>auth.signOut()}> SIGN OUT </OptionLink>)
                 : 
                (<OptionLink to='/signin' >SIGN IN</OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden? null :  <CartDropdown />
        }
       
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: SelectCurrentUser,
    hidden: SelectCartHidden
})

export default connect(mapStateToProps)(Header);