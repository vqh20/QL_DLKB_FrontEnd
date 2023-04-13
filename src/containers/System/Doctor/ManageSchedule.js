import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import * as action from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import  FormattedDate  from '../../../components/Formating/FormattedDate';
import './ManageSchedule.scss'
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { __ } from 'lodash';
import { saveBulkScheduleDoctorService } from '../../../services/userService'
class ManageSchedule extends Component {
    constructor(props){
        super(props)
        this.state={
            listDoctor:[],
            selectedDoctor:{},
            currenDate: '',
            scheduleTime:[]
        }
    }
    //
    componentDidMount(){
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllCodeScheduleTimeRedux()
        // them
        this.setState({
            currenDate: moment(new Date()).startOf('day').valueOf(),
        })
    }
    //
    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if(prevProps.allSchduleTime !== this.props.allSchduleTime){
            let dataTime = this.props.allSchduleTime
            if(dataTime && dataTime.length > 0){
                // dataTime = dataTime.map((item, index)=>{
                //     item.isSelected = false
                //     return item
                // })
                // them isSelected vao dataTime
              dataTime = dataTime.map(item =>({...item, isSelected: false}))
            }
            console.log('check dataTime', dataTime)
            this.setState({
                scheduleTime: dataTime
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = []
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                object.label = `${item.lastName} ${item.firstName}`
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })
        
    }
    handleOneChangeDatePicker=(date)=>{
        this.setState({
            currenDate: date[0]
        })
    }
    handleClickButtonTime= (time)=>{
        console.log('check time click', time)
        let {scheduleTime}=this.state
        if(scheduleTime&&scheduleTime.length > 0){
            scheduleTime = scheduleTime.map(item =>{
                if(item.id === time.id){
                    item.isSelected = !item.isSelected
                }
                return item
            })
            this.setState({
                scheduleTime: scheduleTime
            })
        }
        console.log('check time isSelected click', scheduleTime)

    }
    handleOnclickSaveSchedule = async ()=>{
        let { scheduleTime, currenDate, selectedDoctor }=this.state
        let result =[]
        if (selectedDoctor && isEmpty(selectedDoctor)) {
            toast.error('Vui lòng chọn bác sĩ!')
            return
        }
        if(!currenDate){
            toast.error('Vui lòng chọn ngày!')
            return
        }
        
        //let formatDate = moment(currenDate).format('DD/MM/YYYY')
        let formatDate = new Date(currenDate).getTime()

        if(scheduleTime && scheduleTime.length > 0){
            let selectedTime = scheduleTime.filter(item => item.isSelected === true)
            console.log('check selectedTime', selectedTime)

            if(selectedTime && selectedTime.length>0){
                // duyet qua selectedTime, mỗi item tạo 1 object
                selectedTime.map(item=>{
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatDate
                    object.timeType = item.keyMap
                    //đẩy object vào mảng result
                    result.push(object)
                })
                
            }else{
                toast.error('Vui lòng chọn thời gian khám bệnh!')
            }
        }
        let res = await saveBulkScheduleDoctorService({
            arrSchedule: result,
            doctorId:selectedDoctor.value,
            date: formatDate 
        })
        if(res && res.schedule.errCode ===0){
            toast.success('Lưu kế hoạch khám bệnh thành công!')
        }else{
            toast.error('Lưu kế hoạch khám bệnh thất bại!')
            console.log('saveBulkScheduleDoctorService err',res)
        }

        console.log('check res saveBulkScheduleDoctor', res)
        console.log('check state onclick save', this.state)
        console.log('check result', result)
    }
    render() {
        //console.log('check state manage-schedule:', this.state)
        //console.log('check props manage-schedule:', this.props)
        let {scheduleTime, currenDate}=this.state
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log('check state scheduleTime -> onclick:', this.state.scheduleTime)

        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='manage-schedule-title'>Quản lý kế hoạch khám bệnh của bác sĩ</div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3 form-group'>
                                <label>Chọn bác sĩ</label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctor}
                                />
                            </div>
                            <div className='col-3 form-group'>
                                <label>Chọn ngày</label>
                                <DatePicker 
                                    className="form-control"
                                    onChange={this.handleOneChangeDatePicker}
                                    value={currenDate}
                                    minDate={yesterday} 
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {scheduleTime&&scheduleTime.length > 0 
                                && scheduleTime.map((item, index)=>{
                                    return <button 
                                                className={item.isSelected ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                                key={index}
                                                onClick={()=> this.handleClickButtonTime(item)}
                                            >{item.valueVi}</button>
                                })
                                }
                            </div>
                            
                        </div>
                        <button className='btn btn-primary'
                            onClick={()=>this.handleOnclickSaveSchedule()}
                        >Lưu thông tin</button>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        isLoggedIn: state.user.isLoggedIn,
        allSchduleTime: state.admin.allSchduleTime

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(action.fetchAllDoctor()),
        fetchAllCodeScheduleTimeRedux: () => dispatch(action.fetchAllCodeScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
