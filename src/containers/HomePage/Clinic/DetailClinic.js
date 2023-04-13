import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss'
import HeaderHome from '../HeaderHome';
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor'
import DoctorOtherInformation from '../Doctor/DoctorOtherInformation'
import {getDetailClinicService} from '../../../services/userService'
class DetailClinic extends Component {

    constructor(props) {
        super(props)
        this.state = {
           arrDoctor:[],
           dataDetailClinic:{}
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let res = await getDetailClinicService(this.props.match.params.id)
            console.log('check data>>>>>>>>', res)
           
           if(res && res.errCode ===0){
                this.setState({
                    arrDoctor: res.data.doctorInClinic? res.data.doctorInClinic:[] ,
                    dataDetailClinic: res.data
                })
           } 
           
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    render() {
        let {arrDoctor, dataDetailClinic}=this.state
        console.log('check arr dataDetailClinic>>>>>>>>', dataDetailClinic)
        return (
            <>
                <HeaderHome isShowBanner={false}/>
                <div className='name-clinics'>
                    {dataDetailClinic&&dataDetailClinic.name
                    && <div className=''>{dataDetailClinic.name}</div>
                    }
                </div>
                <div className='specialty-description'>
                    {dataDetailClinic&&dataDetailClinic.descriptionHTML
                    &&  <div dangerouslySetInnerHTML={{__html:dataDetailClinic.descriptionHTML}}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
