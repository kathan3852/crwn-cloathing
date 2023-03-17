import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Outlet } from "react-router-dom";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner= WithSpinner(CollectionsOverview)

class ShopPage extends React.Component{
    state={
        loading: true,
    }
    unsubscribeFromSnapshot= null;

    componentDidMount(){
        const {updateCollections} =this.props;
        const collectionRef= firestore.collection('collections');

        this.unsubscribeFromSnapshot =collectionRef.get().then(async snapshot => {
            const collectionMap=convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
            this.setState({loading: false})
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