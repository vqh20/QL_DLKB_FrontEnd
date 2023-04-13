import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./UserManage.scss"
import {getAllUser, createUserService, delleteUserService,editUserService} from '../../services/userService'
import ModalCreateUser from './ModalCreateUser';
import ModalEditUser from './ModalEditUser';
import { reject } from 'lodash';
import {emitter} from '../../utils/emitter'
import { InputGroup } from 'reactstrap';


class UserManage extends Component {

    constructor(prosp){
        super(prosp);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
        // console.log('abc', response)
    }
    getAllUserFromReact =async()=>{
        let response = await getAllUser('ALL')
        if(response && response.errCode ===0){
            this.setState({
                arrUser: response.users
            })
        }
    }
    // life cycle
    // run component
    //1. run contructor -> init state
    //2. chay Did mount (set state)
    //3. render

    handleAddUser = ()=>{
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUserModal = ()=>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggleEditModal = ()=>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async(data)=>{  // data : state(email, password,....)tu thang con truyen sang
       try {
         let reponse = await createUserService(data);
         if(reponse && reponse.errCode !==0){
            alert(reponse.errMessage)
         }else{
            // create thanh cong
            // gọi lại getAllUser cập nhật lại page
            await this.getAllUserFromReact();
            this.setState({
                isOpenModalUser: false
            })
            emitter.emit('EVENT_CLEAT_MODAL_DATA')
         }
         //console.log("reponse create user:",reponse)
       } catch (e) {
         console.log(e)
       }
       //console.log('data from child', data)
    }

    // delete user
    hanleDeleteUser = async (user)=>{
        console.log('item', user)
        try {
           let response = await delleteUserService(user.id)
           if(response&& response.errCode===0){
            // xoa thanh cong cap nhat lai page
                await this.getAllUserFromReact();
           }else{
                alert(response.errMessage)
           }          
        } catch (e) {
            reject(e)
        }
    }
    // onclick edit 
    handleEditUser = (user)=>{
        console.log('user:', user)
        this.setState({
            isOpenModalEditUser:true,
            userEdit: user
        })
    }
    //on edit user
    onEditUser =async(user)=>{
        //console.log("save edit user", user)
        try {
            let response = await editUserService(user)
            if(response && response.errCode===0){
                this.setState({
                    // đóng modal edit user
                    isOpenModalEditUser: false
                })
                // edit thanh cong => cap nhat page
                await this.getAllUserFromReact()
            }else{
                alert(response.errMessage)
            }
            console.log("check response", response)
        } catch (e) {
           console.log(e)
        }
        

    }

    render() {
        let arrUser = this.state.arrUser
        console.log('check userrrr', arrUser)
        return (
            <div className="users-container">
                <ModalCreateUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFrom = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                {/* isOpenModalEditUser : true => bật modal edit
                    su ly componet didmount ko nhan duoc du lieu*/}
                {this. state.isOpenModalEditUser&&
                    <ModalEditUser 
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFrom = {this.toggleEditModal}
                        currentUser = {this.state.userEdit}
                        editUser = {this.onEditUser}
                    />
                }
                <div className='title text-center'> this get all</div>

                <div className='mx-1'>
                    <button 
                        className='btn btn-primary'
                        onClick={()=>this.handleAddUser()}
                    >Add new user</button>
                </div>
                <div className='user-table mt-3 mx-1'>
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>email</th>
                            <th>first name</th>
                            <th>last name</th>
                            <th>address</th>
                            <th>phone number</th>
                            <th>gender</th>
                            <th>position</th>
                            <th>role</th>
                            <th>action</th>
                        </tr>
                    
                        {
                            arrUser && arrUser.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.positionId}</td>
                                        <td>{item.roleId}</td>
                                        <td>
                                            <button className='action-button-edit' onClick={()=> this.handleEditUser(item)}><i className='fas fa-pencil-alt edit-action'></i></button>
                                            <button className='action-button-delete' onClick={()=> this.hanleDeleteUser(item)}><i className='fas fa-trash delete-action'></i></button>
                                        </td>
                                    </tr>
                                    )
                                })
                        }
                    </tbody>     
                    
                    
                </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
