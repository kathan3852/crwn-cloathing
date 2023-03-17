import { createSelector } from "reselect";


const selectShop= state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop=> {
      //console.log(shop.collections);
      return shop.collections}
)
export const selectCollectionsForPreview= createSelector( 
  [selectCollections],
  collections => collections? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionUrlParam => 
  createSelector(
    [selectCollections],
    collections => {
      
      return (collections? collections[collectionUrlParam] : null)
    }
  )

export const selectIsCollectionFetching= createSelector(
  [selectShop],
  shop=> shop.isFetching
)

export const isCollectionLoaded= createSelector(
  [selectShop],
  shop => !!shop.collections
)