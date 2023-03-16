import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Outlet } from "react-router-dom";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component{

    unsubscribeFromSnapshot= null;

    componentDidMount(){
        const {updateCollections} =this.props;
        const collectionRef= firestore.collection('collections');

        this.unsubscribeFromSnapshot =collectionRef.onSnapshot(async snapshot => {
            const collectionMap=convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
        })

    }

    render(){
        return(
            <div className="shop-page">
                <CollectionsOverview />
                <Outlet />
            </div>
        )
    }
}

const mapDispatchToProps= dispatch => ({
    updateCollections: collectionMap=> dispatch(updateCollections(collectionMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);