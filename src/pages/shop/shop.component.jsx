import React from "react";
import  ShopData from './shop.data.js'
import CollectionPreview from "../../components/collection-preview/collection-preview.component.jsx";

class ShopPage extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            collections : ShopData,
        }
    }

    render(){
        const collections= this.state.collections;
        return(
            <div className="shop-page">
                {
                collections.map(({id, ...otherProps}) => (
                    <CollectionPreview key={id} {...otherProps} />
                ))
                }
            </div>
        )
    }
}

export default ShopPage;