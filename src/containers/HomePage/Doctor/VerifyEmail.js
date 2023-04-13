import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss'
import HeaderHome from '../HeaderHome';
import { postVerifyBookAppointmentService } from '../../../services/userService'
class VerifyEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            statusVerify:false  
        }
    }

    async componentDidMount() {
        // query param
        if(this.props.location&&this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await postVerifyBookAppointmentService({
                token:token,
                doctorId:doctorId
            })
            if(res&&res.data.errCode === 0){
                this.setState({
                    statusVerify: true
                })
            }
            console.log('check token, doctorId:', token, doctorId)
        }
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let {statusVerify}= this.state
        return (
            <>
                <HeaderHome
                    isShowBanner={false}
                />
                <div className='status-container'>
                    {statusVerify ? <div className='status-email'>Xác nhận đặt lịch khám bệnh thành công. Xin chân thành cảm ơn!</div>
                        : <div className='status-email'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>    
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
