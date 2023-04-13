import React, { Component } from 'react';
import { connect } from "react-redux";
import ModalBooking from './Modal/ModalBooking';
import './ScheduleDoctor.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { getScheduleByDateService } from '../../../services/userService'
class ScheduleDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays:[],
            allScheduleTime:[],
            isOpenModalBooking: false,
            postDataTimeClick:{}
        }
    }

    async componentDidMount() {
        
        if(this.props.doctorId){
            let arrDate = this.getArrDate()
            let res = await getScheduleByDateService(this.props.doctorId, arrDate[0].value)
            this.setState({
                allScheduleTime: res.schedule.data ? res.schedule.data: []
            })
        } 
        // let arrDate = []
        // for(let i=0; i<7; i++){
        //     let object={}
        //     object.lable = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
        //     object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

        //     arrDate.push(object)
        // }

        // this.setState({
        //     allDays: arrDate
        // })
        let arrDate = this.getArrDate()
        this.setState({
            allDays:arrDate
        })
    }
    // viet hoa text time
    capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);

    }
    getArrDate = ()=>{
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if(i===0){
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${ddMM}`
                object.lable = today
            }else{
                //object.lable = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                let todayNext = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                object.lable = this.capitalizeFirstLetter(todayNext)

            }
            //object.lable = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            arrDate.push(object)
        }

        // this.setState({
        //     allDays: arrDate
        // })
        return arrDate
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let arrDate = this.getArrDate()
        
        if(this.props.doctorId !== prevProps.doctorId){
            let res = await getScheduleByDateService(this.props.doctorId, arrDate[0].value)
            this.setState({
                allScheduleTime: res.schedule.data ? res.schedule.data: []
            })
        } 
    }

    handleOnchangeSelectDays = async(event)=>{
        console.log('check doctor id props', this.props.doctorId)
        //lay doctor id tren url
        if (this.props.doctorId && this.props.doctorId) {
            let doctorId = this.props.doctorId
            let date = event.target.value

            let res = await getScheduleByDateService(doctorId, date)
            if (res && res.schedule.errCode ===0){
                this.setState({
                    allScheduleTime: res.schedule.data ? res.schedule.data : []
                })
                //console.log('check res.schedule.data', res.schedule.data)
            }
            console.log('check res getScheduleByDateService ', res)
        }

        console.log('check handleOnchangeSelectDays',event.target.value )
    }
    handleShowHideModalBooking = (time)=>{
        console.log('check time:',time)
        this.setState({
            isOpenModalBooking: true,
            postDataTimeClick: time
        })
    }
    closeModalBooking = ()=>{
        this.setState({
            isOpenModalBooking:false
        })
    }
    render() {
        let { allDays, allScheduleTime, isOpenModalBooking,postDataTimeClick }=this.state
        //console.log('check allScheduleTime',allScheduleTime)
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelectDays(event)}>
                            {allDays&&allDays.length>0 
                            && allDays.map((item, index)=>{
                                return <option key={index} value={item.value}>{item.lable}</option>
                            })
                            }
                        </select>
                    </div>
                    <div className='all-time'>
                        <div className='text-calendar'><i className='fas fa-calendar-alt'></i>lịch khám</div>
                        <div className='schedule-time'>
                            {allScheduleTime && allScheduleTime.length>0 ?
                                allScheduleTime.map((item, index)=>{
                                    return <button 
                                                key={index}
                                                onClick={()=>this.handleShowHideModalBooking(item)}
                                            >{item.timeTypeData.valueVi}</button>
                                })
                                : <div className='content-no-schedule'>Bác sĩ không có lịch khám bệnh trong thời gian này !</div>
                            }
                        </div>
                    </div>
                </div>
                <ModalBooking 
                    isOpenModalBooking={isOpenModalBooking}
                    dataTime={postDataTimeClick}
                    closeModal={this.closeModalBooking}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ScheduleDoctorMenuPath: state.app.ScheduleDoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
