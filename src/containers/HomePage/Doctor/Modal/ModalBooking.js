import React, { Component } from 'react';
import { connect } from "react-redux";
import './ModalBooking.scss'
import ProfileDoctor from '../ProfileDoctor';
import * as action from '../../../../store/actions'
import Select from 'react-select'
import {toast} from 'react-toastify';
import moment from 'moment'
import { postPatientBookingAppointment } from '../../../../services/userService'
import DatePicker from '../../../../components/Input/DatePicker'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalBooking extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            fullName:'',
            phoneNumber:'',
            email:'',
            address:'',
            reason:'',
            birthday:'',
            selectedGender:'',
            doctorId:'',

            timeType:'',
            timeSeeDoctor:'',

            allGender: ''
        }
    }

    async componentDidMount() {
        this.props.fetchGenderRedux()
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !==this.props.genderRedux){
            this.setState({
                allGender: this.builDataSelectGender(this.props.genderRedux)
            })
        }
        if(this.props.dataTime !== prevProps.dataTime){
            if (this.props.dataTime && this.props.dataTime.doctorId && this.props.dataTime.timeType&& this.props.dataTime.date){
                this.setState({
                    doctorId: this.props.dataTime.doctorId,
                    timeType: this.props.dataTime.timeType,
                    //them
                    timeSeeDoctor: this.props.dataTime.date
                })
            }
        }
    }
    builDataSelectGender = (data)=>{
        let result =[]
        if(data &&data.length>0){
            data.map(item=>{
                let object = {}
                object.label = item.valueVi
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result
    }
    
    handleOnchangeInput = (event, id)=>{
        let valueInput = event.target.value
        let copyState = {...this.state}
        copyState[id] = valueInput
        this.setState({
            ...copyState
        })
    }

    handleOnchangeDatePicker = (date)=>{
        this.setState({
            birthday: date[0]
        })
    }

    handleOnChangeSelect = (selectedOption)=>{
        this.setState({
            selectedGender: selectedOption
        })
    }
    //
    handleSaveBooking = async()=>{
        console.log("check state onclick handleSaveBooking", this.state)

        //validate input
        let dateConver = new Date(this.state.birthday).getTime()
        let timeBooking = this.buildTimeBookingEmail(this.props.dataTime)
        // console.log('check dataTime',this.props.dataTime)
        // return
        let res =await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: dateConver,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            //them
            timeSeeDoctor: this.state.timeSeeDoctor,

            timeBooking: timeBooking,
        })
        console.log('check', res)
        if (res && res.data &&res.data.errCode ===0){
            toast.success('Đặt khám thành công!')
            this.props.closeModal()
            this.setState({
                fullName:'',
                phoneNumber:'',
                email:'',
                address:'',
                reason:'',
                birthday:'',
                selectedGender:'',
               
            })
        }else{
            toast.error('Đặt khám thất bại, vui lòng thử lại')
        }
    }

    buildTimeBookingEmail = (dataTime) => {
        console.log('check dataTime Prosp', dataTime)
        if (dataTime && dataTime.date && dataTime.timeTypeData.valueVi) {
            let dateBooking = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            let time = dataTime.timeTypeData.valueVi
            return `${time} - ${dateBooking}`
        }
        return <></>
    }
    render() {
        let { isOpenModalBooking, closeModal,dataTime }=this.props;
        console.log('check data time click', dataTime)
        let doctorId ='';
        if(dataTime&& dataTime.doctorId){
            doctorId = dataTime.doctorId
        }

        console.log('check onchange input', this.state)
        return (
            <>
                <Modal isOpen={isOpenModalBooking}  className='booking-modal-container' centered size='lg'>
                    <div className='booking-modal-content'>
                        <div className='modal-header'>
                            <span className='header-left'>Thông tin đặt lịch khám bệnh</span>
                            <span className='header-right' onClick={closeModal}><i className='fas fa-times'></i></span>
                        </div>
                        <div className='modal-body container'>
                            {/* cover sang string */}
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-info'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDecriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowPrice={true}
                                    isShowlinkDetaiDoctor={false}
                                />
                            </div>
                            
                            <div className='row'>
                                <div className='col-6 form-group mb-3'>
                                    <label>Họ tên</label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event)=>this.handleOnchangeInput(event, 'fullName')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group mb-3'>
                                    <label>Số điện thoại</label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group mb-3'>
                                    <label>Email</label>
                                    <input className='form-control '
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group mb-3'>
                                    <label>Địa chỉ</label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    ></input>
                                </div>
                                
                                <div className='col-6 form-group mb-3'>
                                    <label>Ngày sinh</label>
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        className='form-control'
                                        value={this.state.birthday}
                                        placeholder='Chọn ngày sinh'
                                    />
                                </div>
                                <div className='col-6 form-group mb-3'>
                                    <label>Giới tính</label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleOnChangeSelect}
                                        options={this.state.allGender}
                                        placeholder= 'Chọn giới tính'
                                    />
                                </div>
                                <div className='col-12 form-group mb-3'>
                                    <label>Lý do khám</label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-success'
                                onClick={()=>this.handleSaveBooking()}
                            >Xác nhận</button>
                            <button class="btn btn-secondary" onClick={closeModal}>Hủy</button>

                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        genderRedux: state.admin.genders 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderRedux:()=>dispatch(action.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
