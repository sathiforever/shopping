import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { addShipping } from './actions/cartActions'

class Recipe extends Component{
    
    constructor(props){
        super(props);
        this.state = { shippingText:false}
    }
    // componentWillUnmount() {
    //      if(this.refs.shipping.checked)
    //           this.props.substractShipping();
    //           this.state.shippingText=false;
    // }

    // handleChecked = (e)=>{
    //     if(e.target.checked){
    //         this.props.addShipping();
    //         this.state.shippingText=true
    //     }
    //     else{
    //         this.props.substractShipping();
    //         this.state.shippingText=false;
    //     }
    // }

    render(){
        const priceDetails = this.props.cartItem.length && this.props.cartItem;
        const priceLists = priceDetails.map((priceItem,index)=>{
            return(
                <div key={index+1} className="cardAddedItemsRow">
                        <div className="itemListRow"><span>(Item {index+1}  Qty {priceItem.quantity}) </span>Price :<span> {(priceItem.price.display * priceItem.quantity)}</span></div>
                        <div className="itemDiscountRow"><span> Discount </span>:<span>{(priceItem.price.display * priceItem.quantity)-(priceItem.price.actual * priceItem.quantity)}</span></div>
                </div>
            )
        })
        return(
            <div className="skusRecipt_container">
                <div className="collection">
                    <div className="title__skusReceipt">Price Details</div>
                    <li className="collection-item">
                            {/* <label>
                                <input type="checkbox" ref="shipping" onChange= {this.handleChecked} />
                                <span title="Click here for add shipping amount" >Shipping &#8377;(+100)</span>
                            </label> */}
                            <table>
                                {priceLists}
                            </table>
                            
                        </li>
                        <li className="collection-item"><b>Total{this.state.shippingText?" (With Shipping)":""}: &#8377; {this.props.total}</b></li>
                    </div>
                    {/* <div className="checkout">
                        <button className="waves-effect waves-light btn">Checkout</button>
                    </div> */}
                 </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
