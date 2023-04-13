import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _, { isEmpty } from 'lodash'
class ModalEditUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            address:''
        }
    }
    
    componentDidMount() {
        console.log('didmount edit', this.props.currentUser)
        // hien thi du lieu input edit
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){  // !_.isEmpty dùng trong thư viện lodash để check object có rỗng không
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address

            })
        }
    }


    // on off modal create user
    toggle = ()=>{
        this.props.toggleFrom();
    }

    // luu value input vao state
    handleOnChangeIput = (event, id)=>{

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
    
    // onclick on edit 
    hanleEditUser = ()=>{
       let isValue= this.checkValideInput()
       if(isValue ===true){
        //call api edit user
        this.props.editUser(this.state);

       }
        // console.log('data modal', this.state)
    }
    

    render() {
        // console.log('check user edit', this.props)
        return (
            <Modal  isOpen={this.props.isOpen}
                    fade={false} 
                    toggle={()=>this.toggle()}
                    className={'modal-user-container'}
                    size={"lg"}
                    
            >
                    
                <ModalHeader toggle={()=>this.toggle()}>modal edit user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                disabled 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeIput(event, 'email')}}
                                value={this.state.email}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input 
                                disabled
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
                        <div className='input-container max-width-input'>
                            <label>address</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeIput(event, 'address')}}
                                value={this.state.address}
                            ></input>
                        </div>
                        
                    </div >
                    
                </ModalBody>
                <ModalFooter>
                <Button color="primary" 
                        onClick={()=>this.hanleEditUser()}
                >
                    on edit
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



