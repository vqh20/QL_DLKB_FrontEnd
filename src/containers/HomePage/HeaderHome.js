import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss'
import {withRouter} from 'react-router'
import { path } from '../../utils/constant'


class HeaderHome extends Component {  


    returnToHomePage = ()=>{
        if(this.props.history){
            this.props.history.push('/home-page')
        }
    }
    render() {

        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fa fa-bars"></i>
                            <div className='logo-header' 
                                onClick={()=>this.returnToHomePage()}
                            ><span className='logo-left'>Doctor</span><span className='logo-right'>Appointment</span></div>
                        </div>
                        <div className='center-content'>
                            <div className='center-content-item'>Chuyên khoa</div>
                            <div className='center-content-item'>Cơ sở y tế</div>
                            <div className='center-content-item'>Bác sĩ</div>
                            <div className='center-content-item'>Gói khám</div>
                        </div>
                        <div className='right-content'>
                        <i className="fas fa-question-circle"></i>Hỗ trợ
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && 
                    <div className='home-header-banner'>
                        <div className='banner-up'>
                            <div className='title-banner-top'>NỀN TẢNG Y TẾ</div>
                            <div className='title-banner-bottom'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='search-banner'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Tìm chuyên khoa'></input>
                            </div>
                        </div>
                        <div className='banner-down'>
                            <div className='option-banner'> 
                                <div className='option-item'>
                                    <div className='option-item-img'><i className='far fa-hospital'></i></div>
                                    <div className='option-item-text'>Khám Chuyên Khoa</div>
                                </div><div className='option-item'>
                                    <div className='option-item-img'><i className='fas fa-mobile-alt'></i></div>
                                    <div className='option-item-text'>Sức Khỏe Doanh Nghiệp</div>
                                </div><div className='option-item'>
                                    <div className='option-item-img'><i className='fas fa-procedures'></i></div>
                                    <div className='option-item-text'>Khám Tổng Quát</div>
                                </div><div className='option-item'>
                                    <div className='option-item-img'><i className='fas fa-mobile-alt'></i></div>
                                    <div className='option-item-text'>Xét Nghiệm Y Học</div>
                                </div><div className='option-item'>
                                    <div className='option-item-img'><i className='fas fa-user-md'></i></div>
                                    <div className='option-item-text'>Sức Khỏe Tinh Thần</div>
                                </div><div className='option-item'>
                                    <div className='option-item-img'><i className="fas fa-procedures"></i></div>
                                    <div className='option-item-text'>Khám Nha Khoa</div>
                                </div>                          
                            </div>

                        </div>
                    </div>
                }
                
            </>
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
    };
};

export default withRouter(  connect(mapStateToProps, mapDispatchToProps)(HeaderHome)  );
