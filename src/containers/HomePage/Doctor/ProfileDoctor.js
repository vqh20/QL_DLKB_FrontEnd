import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import moment from 'moment'
import { getProfileDoctorService } from '../../../services/userService'
import {Link} from 'react-router-dom'
class ProfileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataProfileDoctor:{}
        }
    }

    async componentDidMount() {
        let data =await this.getDoctorId(this.props.doctorId)
        this.setState({
            dataProfileDoctor: data
        })
    }
    getDoctorId = async(doctorId)=>{
        let data = {}
        if (doctorId) {
            let res = await getProfileDoctorService(doctorId)
            console.log('check data profile doctor', res)
            if (res && res.profileDoctor.errCode===0){
                data = res.profileDoctor.data
            }
        }
        return data
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    renderTime=(dataTime)=>{
        console.log('check dataTime Prosp', dataTime)
        if(dataTime){
            let dateBooking = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            let time = dataTime.timeTypeData.valueVi
            return <>
                <div className='time'>{`Lịch khám: ${time} - ${dateBooking}`}</div>
                <div className='text-free'>Miễn phí đặt lịch</div>
                    </>
        }
        return <></>
        
    }

    render() {
        console.log('check dataProfileDoctor', this.state.dataProfileDoctor)
        let {dataProfileDoctor}=this.state
        let { isShowDecriptionDoctor, dataTime,isShowPrice,isShowlinkDetaiDoctor,doctorId } = this.props
        let titleDoctor=''
        if (dataProfileDoctor && dataProfileDoctor.positionData) {
            titleDoctor = `${dataProfileDoctor.positionData.valueVi}, ${dataProfileDoctor.lastName} ${dataProfileDoctor.firstName}`
        }
        return (
            <>
                <div className='intro-doctor'>
                    <div
                        className='content-left'
                        style={{ backgroundImage: `url(${dataProfileDoctor.image ? dataProfileDoctor.image : ''})` }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='title-up'>{titleDoctor}</div>
                        <div className='title-down'>
                            {isShowDecriptionDoctor && isShowDecriptionDoctor===true ?
                                    <>
                                        {dataProfileDoctor.Markdown && dataProfileDoctor.Markdown.description
                                        && <span>{dataProfileDoctor.Markdown.description}</span>}
                                    </>
                                    :
                                    <>{this.renderTime(dataTime)}</>
                            }
                                
                        </div>
                        

                    </div>

                </div>
                {isShowPrice&& isShowPrice===true? 
                        <div className='price-text'>Giá khám: 
                            {dataProfileDoctor && dataProfileDoctor.Doctor_info && dataProfileDoctor.Doctor_info.paymentTypeData && dataProfileDoctor.Doctor_info.priceTypeData.valueVi
                                && <span className='money'>{` ${dataProfileDoctor.Doctor_info.priceTypeData.valueVi} VNĐ`}</span>
                            }
                        </div>
                        :
                        <div className='text-seemore'><Link to={`/detail-doctor/${doctorId} `}>Xem thêm</Link></div>
                }
                
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
