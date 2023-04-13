import React, { Component } from 'react';
import { connect } from "react-redux";
import HeaderHome from '../HeaderHome';
import  './DetailDoctor.scss';
import ScheduleDoctor from './ScheduleDoctor';
import DoctorOtherInformation from './DoctorOtherInformation';
import {getDdetalInfoDoctor} from '../../../services/userService'
class DetailDoctor extends Component {

    constructor(props){
        super(props)
        this.state = {
            detailDoctor:{}
        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let res = await getDdetalInfoDoctor(this.props.match.params.id)
            //console.log('check data detail', res)
           // imageBase64 = new Buffer(user.image, 'base64').toString('binary')
           if(res && res.errCode ===0){
                this.setState({
                    detailDoctor: res.data
                })
           } 
           
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){

    }


    render() {
        //console.log(this.props.match.params.id)
        console.log('check data doctor infohihi', this.state.detailDoctor)
        let dataDetaiDoctor = this.state.detailDoctor
        let title = ''
        let detailInfo=''
        if(dataDetaiDoctor && dataDetaiDoctor.positionData){
            title = `${dataDetaiDoctor.positionData.valueVi}, ${dataDetaiDoctor.lastName} ${dataDetaiDoctor.firstName}`
        }
        if(dataDetaiDoctor && dataDetaiDoctor.Markdown && dataDetaiDoctor.Markdown.contentHTML){
            detailInfo = dataDetaiDoctor.Markdown.contentHTML
        }
        return (
           <>
                <HeaderHome isShowBanner={false}/>
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div 
                            className='content-left'
                            style={{backgroundImage: `url(${dataDetaiDoctor.image?dataDetaiDoctor.image: '' })`}}
                        >   
                        </div>
                        <div className='content-right'>
                            <div className='title-up'>{title}</div>
                            <div className='title-down'>
                                {dataDetaiDoctor.Markdown && dataDetaiDoctor.Markdown.description
                                && <span>{dataDetaiDoctor.Markdown.description}</span>}
                            </div>
                        </div>

                    </div>
                    
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <ScheduleDoctor
                                doctorId={dataDetaiDoctor.id}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorOtherInformation
                                postDoctorId={dataDetaiDoctor.id}
                            />
                        </div>
                    </div>
                    <div className='detai-info-doctor' dangerouslySetInnerHTML={{__html: detailInfo}}></div>
                    <div className='comment-doctor'></div>
                </div>
           </>
        );
    }
}

const mapStateToProps = state => {
    return {
        DetailDoctorMenuPath: state.app.DetailDoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
