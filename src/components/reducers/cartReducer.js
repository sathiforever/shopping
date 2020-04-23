// import Item1 from '../../images/item1.jpg';
// import Item2 from '../../images/item2.jpg';
// import Item3 from '../../images/item3.jpg';
// import Item4 from '../../images/item4.jpg';
// import Item5 from '../../images/item5.jpg';
// import Item6 from '../../images/item6.jpg';
import { ADD_TO_CART,ITEM_TO_BE_REMOVE,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions';
import datapayload from './../data/cart.json';

const initState = {
    // items: [
    //     {id:1,title:'Winter body', price: {actual: 310, display: 900},discount: 64,img:Item1},
    //     {id:2,title:'Adidas', price: {actual: 311, display: 900},discount: 64,img: Item2},
    //     {id:3,title:'Vans',price: {actual: 313, display: 900},discount: 64,img: Item3},
    //     {id:4,title:'White', price: {actual: 355, display: 900},discount: 64,img:Item4},
    //     {id:5,title:'Cropped-sho', price: {actual: 316, display: 900},discount: 64,img: Item5},
    //     {id:6,title:'Vans cut shoes',price: {actual: 312, display: 900},discount: 64,img: Item3},
    //     {id:7,title:'Royal canvas', price: {actual: 314, display: 900},discount: 64,img:Item1},
    //     {id:8,title:'Blues',price: {actual: 315, display: 900},discount: 64,img: Item6},
    //     {id:9,title:'Winter body', price: {actual: 369, display: 900},discount: 64,img:Item1},
    //     {id:10,title:'Adidas', price: {actual: 317, display: 900},discount: 64,img: Item2},
    //     {id:11,title:'Vans',price: {actual: 318, display: 900},discount: 64,img: Item3},
    //     {id:12,title:'White', price: {actual: 309, display: 900},discount: 64,img:Item4},
    //     {id:13,title:'Cropped-sho', price: {actual: 300, display: 900},discount: 64,img: Item5},
    //     {id:14,title:'Vans cut shoes',price: {actual: 320, display: 900},discount: 64,img: Item3},
    //     {id:15,title:'Royal canvas', price: {actual: 321, display: 900},discount: 64,img:Item1},
    // ],
    items:datapayload.items,
    addedItems:[],
    total: 0

}

// const productList = getProducts().then((products) => {
//         this.setState({ products });
//       });

// console.log("product list "+productList);
// const initState = {
//     productList,
//     addedItems:[],
//     total: 0

// }
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price.actual 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price.actual 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === ITEM_TO_BE_REMOVE){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price.actual * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price.actual
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price.actual
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price.actual
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 100
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 100
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer
