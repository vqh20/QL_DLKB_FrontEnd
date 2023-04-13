import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHome from "./HeaderHome";
import ListHomePage from "./Section/ListHomePage";
import About from './Section/About';
import HomeFooter from './HomeFooter';
import SpecialtyList from './Section/SpecialtyList';
import ClinicList from './Section/ClinicList';
class HomePage extends Component {  

    render() {
        
        return (
            <div>
                <HeaderHome isShowBanner={true}/>
                <SpecialtyList/>
                <ClinicList/>
                <ListHomePage/>
                <About/>
                <HomeFooter/>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
