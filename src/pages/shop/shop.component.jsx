import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Outlet } from "react-router-dom";

const ShopPage= () =>{
        return(
            <div className="shop-page">
                <CollectionsOverview />
                <Outlet />
            </div>
        )
}


export default ShopPage;