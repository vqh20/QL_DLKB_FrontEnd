import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { isEmpty } from 'lodash';
import { USER_ROLE } from '../../utils/constant';

class Header extends Component {

constructor(props){
    super(props);
    this.state = {
        menuApp: [],
    }
}
componentDidMount(){
    let {userInfo} = this.props
    let menu = []  
    if(userInfo&& !isEmpty(userInfo)){
        let role = userInfo.roleId
        if(role === USER_ROLE.ADMIN){
            menu = adminMenu;
          
        }
        if (role === USER_ROLE.DOCTOR) {
            menu = doctorMenu;
            
        }
    }
    this.setState({
        menuApp: menu
    })   
    console.log('check user info', this.props.userInfo)
    
}

    render() {
        console.log('check state', this.state.menuApp)      

        const { processLogout ,userInfo} = this.props;
        let {menuApp} = this.state
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={menuApp} />
                </div>
                <div className='title-header'>
                    Xin chào, {userInfo && userInfo.firstName ? userInfo.firstName : ''} !
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
