import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import HeaderHome from '../HeaderHome';
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor'
import DoctorOtherInformation from '../Doctor/DoctorOtherInformation'
import {getDetailSpecialtyService} from '../../../services/userService'
class DetailSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
           arrDoctor:[],
           dataDetailSpecialty:{}
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let res = await getDetailSpecialtyService(this.props.match.params.id)
            console.log('check data>>>>>>>>', res)
           
           if(res && res.errCode ===0){
                this.setState({
                    arrDoctor: res.data.doctorInSpecialty? res.data.doctorInSpecialty:[] ,
                    dataDetailSpecialty: res.data
                })
           } 
           
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    render() {
        let {arrDoctor, dataDetailSpecialty}=this.state
        console.log('check arr doctor', arrDoctor)
        return (
            <>
                <HeaderHome isShowBanner={false}/>
                <div className='specialty-description'>
                    {dataDetailSpecialty&&dataDetailSpecialty.descriptionHTML
                    &&  <div dangerouslySetInnerHTML={{__html:dataDetailSpecialty.descriptionHTML}}></div>
                    }
                </div>
                
              <div className='load-doctor'>
                    {arrDoctor&&arrDoctor.length>0 &&
                        arrDoctor.map((item, index)=>{
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='each-doctor-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item.doctorId}
                                                isShowDecriptionDoctor={true}
                                                // dataTime={dataTime}
                                                isShowPrice={false}
                                                isShowlinkDetaiDoctor={false}
                                            />
                                        </div>
                                    </div>
                                    <div className='each-doctor-right'>
                                        <div className='content-up'>
                                            <ScheduleDoctor 
                                                doctorId={item.doctorId}
                                                
                                            />
                                        </div>
                                        <div className='content-downn'>
                                            <DoctorOtherInformation
                                                postDoctorId={item.doctorId}
                                            />
                                        </div>
                                    </div>
                
                                </div>
                            )
                            
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
