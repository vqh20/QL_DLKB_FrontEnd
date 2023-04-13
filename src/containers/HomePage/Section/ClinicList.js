import React, { Component } from 'react';
import { connect } from "react-redux";
import './ClinicList.scss'
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { withRouter } from 'react-router';
import {getAllClinicService} from '../../../services/userService'
class ClinicList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataClinic:[]
        }
    }

    async componentDidMount() {
        let res = await getAllClinicService()
        if(res&&res.errCode ===0){
            this.setState({
                dataClinic: res.data? res.data: []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleViewDetalClinic=(item)=>{
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }
    render() {
        console.log('check data specialty', this.state.dataClinic)
        let {dataClinic} = this.state
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <>
                <div className='section-clinic'>
                    <div className='clinic-content'>
                        <div>
                            <div className='list-title-up'>
                                <div className='list-title-up-left'>Cơ sở y tế nổi bật</div> 
                                <div className='list-title-up-button'><p>Xem thêm</p></div>
                            </div>
                            <Slider {...settings}>
                                {dataClinic&& dataClinic.length>0
                                 && dataClinic.map((item, index)=>{
                                    return <div className='img-list' key={index} onClick={()=>this.handleViewDetalClinic(item)}>
                                                <div className='img' 
                                                    style={{backgroundImage: `url(${item.image})`}}
                                                ></div>
                                                <div className='img-content'>{item.name? item.name:''}</div>
                                            </div>
                                 })
                                }
                               
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

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ClinicList) );
