import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import RangeSlider from './RangeSlider'
import Alert from '@material-ui/lab/Alert';

 class Home extends Component{
    constructor(props){
        super(props)
        this.state={addToBagMessage:'',cartCount:0, products:this.props.items}
        this.message = "";
    }
    getMinMaxPrice = ()=>{
        const priceList = this.props.items.length  && this.props.items.map(priceVal=> priceVal.price.actual);
            const minMaxVal =  priceList.reduce((acc, val) => {
                acc[0] = ( acc[0] === undefined || val < acc[0] ) ? val : acc[0]
                acc[1] = ( acc[1] === undefined || val > acc[1] ) ? val : acc[1]
                return acc;
            }, []);
            return minMaxVal;
      }
    handleClick = (items)=>{
        this.props.addToCart(items.id);
        this.state.cartCount = this.state.cartCount+1;
        this.showConfirmMessage(items.title);
    }
    showConfirmMessage = (text)=>{
        window.confirm("Item "+text+" added in your Bag");
        this.message="Item "+text+" added in your Bag";
    }
    sortByPriceAsc=(e)=>{
        e.preventDefault();
        let sortedProductsAsc;
          sortedProductsAsc= this.props.items.sort((a, b) => (a.price.actual - b.price.actual));
          this.setState({
              products:sortedProductsAsc
          })
    }

    sortByPriceDesc=(e)=>{
        e.preventDefault();
        let sortedProductsDsc;
          sortedProductsDsc= this.props.items.sort((a, b) => (b.price.actual - a.price.actual))
          this.setState({
              products:sortedProductsDsc
          })
    }
    sortByDiscountAsc=(e)=>{
        e.preventDefault();
        let sortedProductDiscount;
        sortedProductDiscount = this.props.items.sort((a,b)=>(a.discount - b.discount));
        this.setState({products:sortedProductDiscount})
    }
    fetchingCurrentFilterVal = (currentFilterVal)=>{
        console.log("-->",currentFilterVal)
        this.setState({
            products:currentFilterVal
        })
    }
    render(){
        const minMaxPrice = this.getMinMaxPrice();
        let itemList = this.state.products.map(item=>{
            return(
                <div className="card" key={item.id}>
                    <div className="card-image">
                        <img src={item.image} alt={item.name}/>
                    </div>

                    <div className="card-content">
                        <span className="card-title">{item.name}</span>
                            {/* <p>{item.desc.length >=35?item.desc.substring(0, 35) + " ...":item.desc}</p> */}
                            <p><span className="itemActual"><b>&#8377;{item.price.actual}</b></span>&nbsp;&nbsp;<span className="itemDisplayPrice"><b>{item.price.display}</b></span>&nbsp;&nbsp;<span className="itemDiscount"><b>{item.discount}% off</b></span></p>
                    </div>
                    <span to="/" className="btn-floating halfway-fab waves-effect waves-light pdp_addtobag" onClick={()=>{this.handleClick(item)}}>Add to Card</span>
                </div>

            )
        })
        return(
            <div className="container_body">
                <div className="sideMenu">
                    <RangeSlider minMaxPrice={minMaxPrice} skus={this.props.items} filterCallBack={this.fetchingCurrentFilterVal} />
                </div>
                <div className="pdp_container">
                    {this.message!=""?<Alert severity="warning">{this.message}</Alert>:""}
                    <div className="sortBy__pdpContainer"><span>Sort By </span><ul><li><a href="#" onClick={this.sortByPriceDesc}>Price -- High Low</a></li><li><a href="#" onClick={this.sortByPriceAsc}>Price -- Low High</a></li><li><a href="#" onClick={this.sortByDiscountAsc}>Discount</a></li></ul></div>
                {/* <h4 className="center">Bestsellers</h4> */}
                <div className="box">
                    {itemList}
                </div>
            </div>
            </div>
            
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)