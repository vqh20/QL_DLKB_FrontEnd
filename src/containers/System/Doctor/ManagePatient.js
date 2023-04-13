import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import {getAllPatientForDoctorService, doneAppointmentPatientService} from '../../../services/userService'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import {toast} from 'react-toastify'

class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentDate:moment(new Date()).startOf('day').valueOf(),
            dataPatient:[]
        }
    }

    async componentDidMount() {
       let {userInfo} = this.props
       let {currentDate} = this.state
       
       let formatDate = new Date(currentDate).getTime()

       this.getAllPatient(userInfo.id, formatDate)

       
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    getAllPatient = async(userInfo, formatDate)=>{
        let res = await getAllPatientForDoctorService(userInfo, formatDate)
        console.log('check res', res)
        if(res&&res.data.errCode===0){
            this.setState({
             dataPatient: res.data.data
            })
        }
        console.log('check res', res)
    }

    handleOneChangeDatePicker=(date)=>{
        console.log('check date onchage', date)
        this.setState({
            currentDate: date[0]
        }, ()=>{
            let {userInfo} = this.props
                let {currentDate} = this.state
                let formatDate = new Date(currentDate).getTime()
                console.log('check date setstate', formatDate)
                
                this.getAllPatient(userInfo.id, formatDate)
            
        })
    }
    handleDoneAppointment = async(idBooking)=>{
        console.log('check idBooking', idBooking)
        let res = await doneAppointmentPatientService({
            id: idBooking
        })
        // console.log('check res', res)
        // return
        if(res&&res.data.errCode===0){
            toast.success('Cập nhật trạng thái thành công')
            let {userInfo} = this.props
            let {currentDate} = this.state
            
            let formatDate = new Date(currentDate).getTime()
     
            this.getAllPatient(userInfo.id, formatDate)

        }else{
            toast.error('Cập nhật trạng thái thất bại')
        }
    }
    render() {
        console.log(' check state>>>>>>>>>>', this.state)
        let {dataPatient} = this.state
        return (
            <>
                <div className='manage-patient'>
                    <div className='title-patient'>Quản lý bệnh nhân</div>
                    <div className='manage-patient-body row'>
                        <div className='col-3 form-group'>
                            <label className='mb-1'>Chọn ngày khám</label>
                            <DatePicker 
                                    className="form-control"
                                    onChange={this.handleOneChangeDatePicker}
                                    value={this.state.currentDate}
                                    //minDate={yesterday} 
                            />
                        </div>
                        <div className='body-list'>
                            <table id="customers">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian khám</th>
                                        <th>Họ tên</th>
                                        <th>Giới tính</th>
                                        <th>SĐT</th>
                                        <th>Địa chỉ</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    {dataPatient&&dataPatient
                                    && dataPatient.map((item, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>{item.patientData.phonenumber}</td>
                                                <td>{item.patientData.address}</td> 
                                                                                 
                                                <td>
                                                    <button className='button-done'
                                                        onClick={()=>this.handleDoneAppointment(item.id)}
                                                    >Done</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    
                                </tbody>                
                            </table>
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
        userInfo: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
