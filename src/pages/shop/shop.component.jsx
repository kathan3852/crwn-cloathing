import React from "react";
import CollectionsOverviewContainer from "../../components/collections-overview/collection.overview.container";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";




class ShopPage extends React.Component{

    componentDidMount(){
       const  {fetchCollectionsStartAsync} = this.props;
       fetchCollectionsStartAsync();
    }

    render(){
        return(
            <div className="shop-page">
                <CollectionsOverviewContainer />
                <Outlet />
            </div>
        )
    }
}


const mapDispatchToProps= dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())  
})

export default connect(null,mapDispatchToProps)(ShopPage);