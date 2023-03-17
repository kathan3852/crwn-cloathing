import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import CollectionPageContainer from './pages/collection/collection.container';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {Routes, Route, Navigate } from 'react-router-dom';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { SelectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';



class App extends React.Component {
  

  unsubscribeFromAuth=null;
componentDidMount(){
  const {setCurrentUser}= this.props;
  this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef=await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapshot => {
        setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
        })
    
      })
     
    }
    setCurrentUser(userAuth);

  })
}

componentWillUnmount(){
  this.unsubscribeFromAuth();
}
  render(){
    return (

      <div>
        <Header />
       <Routes>
       <Route exact path='/' element={<HomePage />} /> 
       <Route  path='/shop' element={<ShopPage />} >
       </Route>
       <Route exact path='/shop/:collectionId' element={<CollectionPageContainer />} />
       <Route  exact path='/checkout' element={<CheckoutPage />} />
       <Route exact path='/signin' element={ this.props.currentUser? <Navigate to='/' /> : <SignInAndSignUpPage />} />
       </Routes>
      </div>
  );
  }
}

const mapStateToProps= createStructuredSelector({
  currentUser : SelectCurrentUser,

})

const mapDispatchToProps= dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user)),
  
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
