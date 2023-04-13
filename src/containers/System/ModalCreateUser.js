import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import {getAllCodeService} from '../../services/userService'

class ModalCreateUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderArr:[],
            position:[],
            role:[],
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            address:'',           
            phoneNumber:'',
            gender:'',
            position:'',
            role:'',
            img:'',
            previewImgURL:''
        }
        this.listenEmitter();
    }
    // xoa value input
    listenEmitter(){
        emitter.on('EVENT_CLEAT_MODAL_DATA', () =>{
            //reset state
            this.setState({
                email: '',
                password: '',
                firstName:'',
                lastName:'',
                address:'',           
                phoneNumber:'',
                gender:'',
                position:'',
                role:'',
                img:''
            })
        })
    }
    async componentDidMount() {
        try {
                let res = await getAllCodeService('gender')
                if(res && res.errCode === 0){
                    this.setState({
                        genderArr: res.data
                    })
                }
                
            } catch (e) {
                console.log(e)
            }
        try {
                let res = await getAllCodeService('position')
                if(res && res.errCode === 0){
                    this.setState({
                        positionArr: res.data
                    })
                }
                
            } catch (e) {
                console.log(e)
            }
        try {
                let res = await getAllCodeService('role')
                if(res && res.errCode === 0){
                    this.setState({
                        roleArr: res.data
                    })
                }
               
            } catch (e) {
                console.log(e)
            }
    }


    // on off modal create user
    toggle = ()=>{
        this.props.toggleFrom();
    }

    // luu value input vao state
    handleOnChangeIput = (event, id)=>{
        // bad code
        // this. state[id]= event.target.value
        // this.setState({
        //     ...this.state
        // }, ()=>{
        //     console.log('check bad state: ', this.state)
        // })

        //nice code
        let copyState = {...this.state};
        copyState[id]= event.target.value;
        this.setState({
            ...copyState
        })
    }

    // valide input
    checkValideInput =()=>{
        let isValue = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for(let i=0; i< arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValue = false
                alert('vui lòng nhập đủ thông tin');
                break;
            }
        }
        return isValue
    }
    // onclick create user
    hanleAddNewUser = ()=>{
       let isValue= this.checkValideInput()
       if(isValue ===true){
        //call api create user
        this.props.createNewUser(this.state);

       }
        // console.log('data modal', this.state)
    }
    handleOnchangeImg = (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                img: file
            })
        }
        console.log('check file', file)
    }

    render() {
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        console.log('check gender:', this.state.genderArr)
        return (
            <Modal  isOpen={this.props.isOpen}
                    fade={false} 
                    toggle={()=>this.toggle()}
                    className={'modal-user-container'}
                    size={"lg"}
                    
            >
                    
                <ModalHeader toggle={()=>this.toggle()}>Creat user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeIput(event, 'email')}}
                                value={this.state.email}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input 
                                type='password' 
                                onChange={(event)=>{this.handleOnChangeIput(event, 'password')}}
                                value={this.state.password}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>firstName</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeIput(event, 'firstName')}}
                                value={this.state.firstName}
                            ></input>
                       </div>
                        <div className='input-container'>
                            <label>lastName</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeIput(event, 'lastName')}}
                                value={this.state.lastName}
                            ></input>
                        </div>
                        <div className='input-container col-6'>
                            <label>address</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeIput(event, 'address')}}
                                value={this.state.address}
                            ></input>
                        </div>
                        <div className='input-container col-6 '>
                            <label>phoneNumber</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeIput(event, 'phoneNumber')}}
                                value={this.state.phoneNumber}
                            ></input>
                        </div>
                        <div className='col-4'>
                                    <label>Gender</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(event)=>{this.handleOnChangeIput(event, 'gender')}}
                                    >
                                        {genders && genders.length > 0 && 
                                            genders.map((item, index)=>{
                                                return(
                                                    <option key={index} value={item.key}>{item.valueVi}</option>
                                                )
                                            })
                                        }
                                    </select>
                        </div>
                        <div className='col-4'>
                                    <label>Position</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(event)=>{this.handleOnChangeIput(event, 'position')}}
                                    >
                                        {positions && positions.length > 0 && 
                                            positions.map((item, index)=>{
                                                return(
                                                    <option key={index} value={item.key}>{item.valueVi}</option>
                                                )
                                            })
                                        }
                                    </select>
                        </div>
                        <div className='col-3'>
                                    <label>Role</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(event)=>{this.handleOnChangeIput(event, 'role')}}
                                    >
                                        {roles && roles.length > 0 && 
                                            roles.map((item, index)=>{
                                                return(
                                                    <option key={index} value={item.key}>{item.valueVi}</option>
                                                )
                                            })
                                        }
                                    </select>
                        </div>  
                        <div className='col-6 my-3'>
                                    <label>Image</label><br></br>
                                    <div className='upload'>
                                        <input type='file' id='previewImg' hidden
                                            onChange={(event)=> this.handleOnchangeImg(event)}
                                        ></input>
                                        <label className='up-img' htmlFor='previewImg'>Up Image <i className='fas fa-upload'></i></label>
                                        <div className='preview-img' style={{backgroundImage:`url(${this.state.previewImgURL})`}}></div>
                                    </div>
                        </div>                     
                    </div >
                    
                </ModalBody>
                <ModalFooter>
                <Button color="primary" 
                        onClick={()=>this.hanleAddNewUser()}
                >
                    Create
                </Button>{' '}
                <Button color="secondary" onClick={()=>this.toggle()}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser);



