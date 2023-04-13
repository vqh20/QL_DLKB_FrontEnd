import React, { Component } from 'react';
import { connect } from "react-redux";
import './SpecialtyList.scss'
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgList from '../../../assets/images/img-list.jpg'
import { withRouter } from 'react-router';
import {getAllSpecialtyService} from '../../../services/userService'
class SpecialtyList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty:[]
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService()
        if(res&&res.errCode ===0){
            this.setState({
                dataSpecialty: res.data? res.data: []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleViewDetalSpecialty=(item)=>{
        if(this.props.history){
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    render() {
        console.log('check data specialty', this.state.dataSpecialty)
        let {dataSpecialty} = this.state
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <>
                <div className='section-specialty'>
                    <div className='specialty-content'>
                        <div>
                            <div className='list-title-up'>
                                <div className='list-title-up-left'>Chuyên khoa phổ biến</div>
                                <div className='list-title-up-button'><p>Xem thêm</p></div>
                            </div>
                            <Slider {...settings}>
                                {dataSpecialty&& dataSpecialty.length>0
                                 && dataSpecialty.map((item, index)=>{
                                    return <div className='img-list' key={index} onClick={()=>this.handleViewDetalSpecialty(item)}>
                                                <div className='img' 
                                                    style={{backgroundImage: `url(${item.image})`}}
                                                ></div>
                                                <div className='img-content'>{item.name? item.name:''}</div>
                                            </div>
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
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(SpecialtyList) );
