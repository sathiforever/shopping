import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions'
import Recipe from './Recipe'
class Cart extends Component{

    //to remove the item completely
    handleRemove = (id)=>{
        var getConfirm = window.confirm("Do you want to remove this item from your cart?");
        if (getConfirm === true) {
            this.props.removeItem(id);
        }
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }
    render(){
        console.log(this.props.items)
        // const cartBagText = this.props.items.length ? "You have ordered:":"Your Cart / Bag is Empty"   
        let addedItems = this.props.items.length ?
            (  
                this.props.items.map(item=>{
                    return(
                        <li className="collection-item avatar" key={item.id}>
                                    <div className="item-img"> 
                                        <img src={item.image} alt={item.name} className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{item.name}</span>
                                        <p><span className="itemActual"><b>&#8377;{item.price.actual}</b></span>&nbsp;&nbsp;<span className="itemDisplayPrice"><b>{item.price.display}</b></span>&nbsp;&nbsp;<span className="itemDiscount"><b>{item.discount}% off</b></span></p> 
                                        <div className="add-remove">
                                            <Link to="/cart"><button className="sub_qty" onClick={()=>{this.handleSubtractQuantity(item.id)}}>-</button></Link> 
                                                <span className="cart_qty">{item.quantity}</span>
                                            <Link to="/cart"><button className="add_qty" onClick={()=>{this.handleAddQuantity(item.id)}}>+</button></Link>  
                                        </div>
                                        <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
                                    </div>
                                    
                                </li>
                         
                    )
                })
            ):

             (
                <p>Continue <Link to="/">Shopping</Link></p>
             )
       return(
            <div className="container">
                <div className="cart">
                    {/* <h5>{cartBagText}</h5> */}
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div> 
                {this.props.items.length? <Recipe cartItem={this.props.items} /> : "" }    
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)