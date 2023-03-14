import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectCollections } from "../../redux/shop/shop.selectors.js";
import './collections-overview.styles.css'

const CollectionsOverview= ({collections}) => (
    <div className="collections-overview">
        {
            collections.map(({id, ...otherProps}) => (
                <CollectionPreview key={id} {...otherProps} />
            ))
    }
    </div>
)

const mapStateToProps=  createStructuredSelector({
    collections: selectCollections
})

export default connect(mapStateToProps)(CollectionsOverview);