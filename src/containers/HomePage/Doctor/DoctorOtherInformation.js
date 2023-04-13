import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorOtherInformation.scss'
import { getOtherInfomationDoctorService } from '../../../services/userService'
class DoctorOtherInformation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetal: false,
            dataOtherInfomation:{}
        }
    }

    async componentDidMount() {
        if(this.props.postDoctorId){
            let dataOtherInfomation = await getOtherInfomationDoctorService(this.props.postDoctorId)
            if (dataOtherInfomation && dataOtherInfomation.otherInfomation.errCode===0){
                this.setState({
                    dataOtherInfomation: dataOtherInfomation.otherInfomation.data
                })
            }
        }
        
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // lay props doctor id thằng cha
        console.log('check postDoctorId', this.props.postDoctorId)
        if (this.props.postDoctorId !== prevProps.postDoctorId){
            let dataOtherInfomation = await getOtherInfomationDoctorService(this.props.postDoctorId)
            if (dataOtherInfomation && dataOtherInfomation.otherInfomation.errCode===0){
                this.setState({
                    dataOtherInfomation: dataOtherInfomation.otherInfomation.data
                })
            }
            
            console.log('check dataOtherInfomation ', dataOtherInfomation)
        }
    }

    showHideDetail=()=>{
        this.setState({
            isShowDetal: !this.state.isShowDetal
        })
    }
    render() {
        let { isShowDetal , dataOtherInfomation} = this.state
        console.log('check state dataOtherInfomation', dataOtherInfomation)
        return (
            <>
                <div className='doctor-other-infomation-container'>
                    <div className='content-up'>
                        <div className='text-address'>địa chỉ khám</div>
                        <div className='name-clinic'>
                            {dataOtherInfomation && dataOtherInfomation.nameClinic && <span>{dataOtherInfomation.nameClinic}</span>}
                        </div>
                        <div className='address'>
                            {dataOtherInfomation && dataOtherInfomation.addressClinic && <span>{dataOtherInfomation.addressClinic}</span>}
                        </div>
                    </div>

                    <div className='content-down'>
                        {isShowDetal===false 
                            && < div className='content-down-title'> GIÁ KHÁM: 
                                {dataOtherInfomation && dataOtherInfomation.priceTypeData && dataOtherInfomation.priceTypeData.valueVi && <span className='show-price'>{` ${dataOtherInfomation.priceTypeData.valueVi} VNĐ`}</span>}
                                    <span onClick={() => this.showHideDetail()} className='show'> . Xem chi tiết</span>
                                </div>
                        }

                        {isShowDetal===true
                            &&  <>
                                    <div className='text-price'>giá khám:</div>
                                    <div className='price'>
                                        <span className='price-left'>giá khám: </span>
                                        <span className='price-right'>
                                            {dataOtherInfomation && dataOtherInfomation.priceTypeData && dataOtherInfomation.priceTypeData.valueVi && <span>{` ${dataOtherInfomation.priceTypeData.valueVi} VNĐ`}</span>}
                                        </span>
                                        <div className='note'>
                                            {dataOtherInfomation && dataOtherInfomation.note && <span>{dataOtherInfomation.note}</span>}

                                        </div>
                                    </div>
                            <div className='payment'>Hình thức thanh toán: 
                                {dataOtherInfomation && dataOtherInfomation.paymentTypeData && dataOtherInfomation.paymentTypeData.valueVi && <span>{` ${dataOtherInfomation.paymentTypeData.valueVi}`}</span>}

                            </div>
                                    <div onClick={()=>this.showHideDetail()} className='hide'>Ẩn bảng giá</div>
                                </>
                        }
                        
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorOtherInformation);
