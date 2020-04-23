import React from 'react';
import { Link } from 'react-router-dom'

 class HeaderMenu extends React.Component{
    constructor(props){
        super(props)

    }
    handleSerch = (e)=>{
        alert('search'+e.target.value);
    }
    render(){
        console.log(this.props)
        return(
            <nav className="nav-wrapper">
                <div className="header_container">
                    <Link to="/"><i className="material-icons log-text-orange">star</i></Link>
                    {/* <img className="brand-logo" src={logoImg} /><span className="brand-logo__text">Shopping</span> */}
                    <ul className="container__right">
                        <li><label className="expandSearch">
                            <input type="text" placeholder="Search..." name="search" onChange={this.handleSerch} />
                            <i className="material-icons">search</i>
                            </label></li>
                        <li><label className="headerMenuCardIcon"><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></label></li>
                    </ul>
                </div>
            </nav>
   
        )
    }
}

export default HeaderMenu;