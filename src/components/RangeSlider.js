import React from 'react';
import { Typography,Slider } from '@material-ui/core';


export default class RangeSlider extends React.Component {
  constructor(props){
    super(props);
    this.state={value:this.props.minMaxPrice}
  }
  
  handleChange = (event, newValue) => {
    this.setState({value:newValue});
    const skusList = this.props.skus.length && this.props.skus;
    const minPrice = newValue[0];
    const maxPrice = newValue[1];
    const filteredSkus= skusList && skusList.filter(item => {
        return (
          item.price.actual >= minPrice && 
          item.price.actual <= maxPrice
        )
    });
    console.log(filteredSkus)
    this.props.filterCallBack(filteredSkus);

  }
  valuetext=(value)=> {
    return `${value}`;
  }
  render(){
    
    return (
      <div className="sideMenu__filters">
          <Typography id="range-slider" gutterBottom>
              Filters
          </Typography>
            <Slider
                min={this.props.minMaxPrice[0]}
                max={this.props.minMaxPrice[1]}
                value={this.state.value}
                onChange={this.handleChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                getAriaValueText={this.valuetext}
            />
                    <span>{this.state.value.join()}</span>
      </div>
    );
  }
  
}