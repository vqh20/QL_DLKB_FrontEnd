import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
// import function
import {handleLoginApi}  from '../../services/userService';
//import { userLoginSuccess } from '../../store/actions';





class Login extends Component {
    // chay ham constructor dau tien
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    
    }
    handleOnChangeInputUsername = (event) =>{
        // set lai state
        this.setState({
            username: event.target.value,
        })
    }
    handleOnChangeInputPassword = (event) =>{
        // set lai state
        this.setState({
            password: event.target.value,
        })
    }
    // lay du lieu input username password
    handleLogin = async() =>{
        // clear errMessage
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if(data && data.errCode !==0){
                this.setState({
                    errMessage: data.message
                })
            } 
            if(data && data.errCode ===0){
                // login thanh cong 
                this.props.userLoginSuccess(data.user)

            }       
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            
        }
    }
    // show hide password
    handShowHidePassword =()=>{
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    // enter
    handleKeyDown = (event)=>{
        console.log('check key enter', event)
        if(event.key === 'Enter'){
            this.handleLogin()
        }
    }
    render() {
        return (
            <div className='login-backgound'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input 
                                type='text' 
                                className='form-control ' 
                                placeholder='Enter your username'
                                value={this.state.username}
                                // bat su kien onchange input
                                onChange={(event) => this.handleOnChangeInputUsername(event)}
                                onKeyDown={(event)=>this.handleKeyDown(event)}
                            ></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>

                            <div className='custom-input-password'>
                                <input 
                                    type={this.state.isShowPassword ? 'test': 'password'}
                                    className='form-control ' 
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    // bat su kien onchange input
                                    onChange={(event) => this.handleOnChangeInputPassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}

                                ></input>
                                <span>
                                    <i                 
                                        onClick={()=>{this.handShowHidePassword()}}
                                        className={this.state.isShowPassword ? 'fas fa-eye' : "fas fa-eye-slash"}                                
                                    ></i>
                                </span>
                            </div>
                        </div>
                        
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login' onClick={()=>this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-pass'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center or-login'>
                            <span className=''>Or login with:</span>
                        </div>
                        <div className='col-12 text-center icon-login'>
                            <i className="fab fa-google-plus icon-gg"></i>
                            <i className="fab fa-facebook icon-fb" ></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo)=> dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
