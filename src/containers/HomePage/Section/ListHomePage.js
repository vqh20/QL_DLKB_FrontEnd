import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ListHomePage.scss'
import * as action from '../../../store/actions';
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router';

class ListHomePage extends Component {  
    constructor(props){
        super(props)
        this.state={
            arrDoctor:[]
        }
    }
    componentDidMount(){
        this.props.loadTopDoctor();
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topDoctorRedux !== this.props.topDoctorRedux){
            this.setState({
                arrDoctor: this.props.topDoctorRedux
            })
        }
        console.log('check settate :', this.state.arrDoctor)
    }

    //view detail doctor
    handleViewDetailDoctor = (doctor)=>{
        console.log('check view', doctor)
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        console.log('check topDoctorRedux:', this.props.topDoctorRedux)
        let arrDoctors = this.state.arrDoctor
        console.log('check arrdoctor:', arrDoctors)
        return (
            <>  
                <div className='section-specialty'>
                    <div className='specialty-content'>
                        <div>
                            <div className='list-title-up'>
                                <div className='list-title-up-left'>Bác sĩ nổi bật</div>
                                <div className='list-title-up-button'><p>Xem thêm</p></div>
                            </div>
                            <Slider {...settings}>
                            {arrDoctors&&arrDoctors.length > 0
                                && arrDoctors.map((item,index)=>{
                                    let imageBase64=''
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let name = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `
                                    return(
                                        <div className='img-list-doctor' onClick={()=> this.handleViewDetailDoctor(item)} key={index}>
                                            <div className='img-doctor'
                                                style={{backgroundImage:`url(${imageBase64})`, backgroundSize:'cover'}}
                                            >
                                            </div>
                                            <div className='img-content-doctor'>{name}</div>
                                        </div>
                                    )
                                })
                            }
                                {/* <div className='img-list'>
                                    <div className='img' ></div>
                                    <div className='img-content'>co xuong khop</div>
                                </div>
                                <div className='img-list'>
                                    <div className='img'></div>
                                    <div className='img-content'></div>
                                </div><div className='img-list'>
                                    <div className='img'></div>
                                    <div className='img-content'></div>
                                </div><div className='img-list'>
                                    <div className='img'></div>
                                    <div className='img-content'></div>
                                </div><div className='img-list'>
                                    <div className='img'></div>
                                    <div className='img-content'></div>
                                </div><div className='img-list'>
                                    <div className='img'></div>
                                    <div className='img-content'></div>
                                </div> */}
                            </Slider>
                        </div>
                    </div>
                </div>











                <div className='list-container'>
                    {/* bac si */}
                    {/* <div className='list-home-page' style={{backgroundColor:'white'}}>
                        <div className='list-title-up'>
                            <div className='list-title-up-left'>Bác sĩ nổi bật tuần qua</div>
                            <div className='list-title-up-button'><p>Xem thêm</p></div>
                        </div>
                        <div className='list-title-donw'>
                            {arrDoctors&&arrDoctors.length > 0
                                && arrDoctors.map((item,index)=>{
                                    let imageBase64=''
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let name = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `
                                    return(
                                        <div className='list-title-donw-img-doctor' onClick={()=> this.handleViewDetailDoctor(item)}>
                                            <div className='img-doctor'
                                                style={{backgroundImage:`url(${imageBase64})`, backgroundSize:'cover'}}
                                            >
                                            </div>
                                            <div className='name-doctor'>{name}</div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                       
                    </div> */}

                    {/* cam nang */}
                    <div className='list-home-page'>
                        <div className='list-title-up'>
                            <div className='list-title-up-left'>Cẩm nang</div>
                            <div className='list-title-up-button'><p>Xem thêm</p></div>
                        </div>
                        <div className='list-title-donw'>
                            <div className='list-camnang'>
                                <div className='img-camnang img-left'></div>
                                <p className='img-text-camnang'>Khám nội tiết tại Bệnh viện Hưng Việt cần lưu ý gì? Hướng dẫn đặt khám</p>
                            </div>
                            <div className='list-camnang'>
                                <div className='img-camnang img-right'></div>
                                <p className='img-text-camnang'>5 địa chỉ cấy que tránh thai ở TPHCM: An toàn - Nhanh chóng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: ()=>dispatch(action.fetchTopDoctor())
    };
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ListHomePage));
