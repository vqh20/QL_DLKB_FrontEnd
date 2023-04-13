import { isBuffer, reject } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CRUD_ACTION , CommonUtils} from '../../../utils'
import {getAllCodeService} from "../../../services/userService"
import './UserRedux.scss'
import * as action from '../../../store/actions'
import TableManagerUser from './TableManagerUser';
import { editUser } from '../../../store/actions';
class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state ={
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgURL: '',

            email:'',
            password: '',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address: '',
            gender:'',
            position:'',
            role:'',
            img:'',

            actionCRUD:'',
            userEditId:''
        }
    }

    async componentDidMount() {
        //get gender voi redux
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        // get gender voi react
        // try {
        //     let res = await getAllCodeService('gender')
        //     if(res && res.errCode === 0){
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log("check", res)
        // } catch (e) {
        //     console.log(e)
        // }
    }
// chay sau render
componentDidUpdate(prevProps, prevState, snapshot){
    // render => componentDidUpdate
    // hien tai (this) ?  qua khu (prevProps)
    if(prevProps.genderRedux !== this.props.genderRedux){
        let arrGender = this.props.genderRedux
        this.setState({
            genderArr: arrGender,
            gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
        })
    }
    if(prevProps.positionRedux !== this.props.positionRedux){
        let arrPosition = this.props.positionRedux
        this.setState({
            positionArr: arrPosition,
            position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
        })
    }
    if(prevProps.roleRedux !== this.props.roleRedux){
        let arrRole = this.props.roleRedux
        this.setState({
            roleArr: arrRole,
            role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            
        })
    }
    // defaul input create
    if(prevProps.listUser !== this.props.listUser){
        let arrGender = this.props.genderRedux
        let arrRole = this.props.roleRedux
        let arrPosition = this.props.positionRedux
        if (arrGender && arrGender.length > 0){
            console.log('check arrGender[0].keyMap', arrGender[0].keyMap)

        }
        this.setState({
            email:'',
            password: '',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address: '',
            position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
            role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
            img:'',
            gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',

            actionCRUD: CRUD_ACTION.CREATE,
            previewImgURL:''
        })
    }
}

    handleOnchangeImg = async(event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file)
            //console.log("check img:", base64)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                img: base64
            })
        }
        console.log('check file', file)
    }
// onclick create edit
    handleCreateUser = ()=>{
        let isValid = this.checkValideInput()
        if(isValid === false) return;

        let {actionCRUD} = this.state
        if(actionCRUD === CRUD_ACTION.CREATE){
            // fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address : this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.img,

                
            })
        }
        if(actionCRUD === CRUD_ACTION.EDIT){
            // fire redux edit user
            console.log('check data input edit', this.state.email)
            let test =this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address : this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                image: this.state.img,
                roleId: this.state.role,
                positionId: this.state.position,

               
            })
        }
        
        // setTimeout(()=>{
        //    this.props.fetchUserRedux() 
        // },1000)
        //console.log("check state summit:", this.state)
    }
    checkValideInput = ()=>{
        let isValide = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for(let i=0 ; i<arrCheck.length;i++){
            if(!this.state[arrCheck[i]]){
                isValide = false
                break;
            }
        }
        return isValide
    }
    onChangeInput = (event, id)=>{
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, ()=>{
            console.log('check input onchange:', this.state)
        })
    }
    // hien thi thong tin edit
    handleEditUserParent = (user)=>{
        let imageBase64 = ''
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
            //imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}` 
        }
        console.log('check datafromedit:', user)
        this.setState({
            email:user.email,
            password: 'abcdef',
            firstName:user.firstName,
            lastName:user.lastName,
            phoneNumber:user.phonenumber,
            address: user.address,
            position: user.positionId,
            role: user.roleId,
            img: '',
            previewImgURL:imageBase64,
            gender: user.gender,

            actionCRUD: CRUD_ACTION.EDIT,
            userEditId: user.id

        },()=>{
            console.log('check state value input img', this.state)
        })
    }
    render() {
        //console.log('check gensers', this.props.genderRedux)
        // get render 
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        //
        //console.log('positionArr', this.state.positionArr)
        //
        let {email, password, firstName, lastName, phoneNumber, address,
             gender, position,role, img} = this.state

        let isLoadingGenderReact = this.props.isLoadingGender
        console.log('check state:', this.state)
        return (
            <>
                <div className='user-redux-container'>
                    <div className='title-manager-user'>
                        <div className="text-user-manager" >Quản lý người dùng </div>
                    </div>
                    <div className='user-redux-body'>
                        <div className='container'>
                            <div className='row'>

                                {/* <div className='col-12 my-3'>Thêm người dùng</div> */}
                                <div className='col-12 my-3'>
                                    {/* {isLoadingGenderReact ===true ? 'loading' : ''} */}
                                </div>
                                <div className='col-4 mt-2'>
                                    <label>Email</label>
                                    <input className='form-control' type='email'
                                        value={email}
                                        disabled={this.state.actionCRUD === CRUD_ACTION.EDIT? true:false}
                                        onChange={(event)=>{this.onChangeInput(event, 'email')}}
                                    ></input>
                                </div>
                                <div className='col-4 mt-2'>
                                    <label>Mật khẩu</label>
                                    <input className='form-control' type='password'
                                        value={password}
                                        disabled={this.state.actionCRUD === CRUD_ACTION.EDIT? true:false}
                                        onChange={(event)=>{this.onChangeInput(event, 'password')}}
                                    ></input>
                                </div>
                                <div className='col-4 mt-2'>
                                    <label>Tên người dùng</label>
                                    <input className='form-control' type='text'
                                        value={firstName}
                                        onChange={(event)=>{this.onChangeInput(event, 'firstName')}}
                                    ></input>
                                </div>
                                <div className='col-4 mt-2'>
                                    <label>Tên đệm</label>
                                    <input className='form-control' type='text'
                                        value={lastName}
                                        onChange={(event)=>{this.onChangeInput(event, 'lastName')}}
                                    ></input>
                                </div>
                                <div className='col-4 mt-2'>
                                    <label>Địa chỉ</label>
                                    <input className='form-control' type='text'
                                        value={address}
                                        onChange={(event)=>{this.onChangeInput(event, 'address')}}
                                    ></input>
                                </div>
                                <div className='col-4 mt-2'>
                                    <label>Điện thoại</label>
                                    <input className='form-control' type='number'
                                        value={phoneNumber}
                                        onChange={(event)=>{this.onChangeInput(event, 'phoneNumber')}}
                                    ></input>
                                </div>
                                <div className='col-4 mt-2'>
                                    <label>Giới tính</label>
                                    <select className="form-select" aria-label="Default select example"
                                        value={gender}
                                        onChange={(event)=>{this.onChangeInput(event, 'gender')}}
                                    >
                                        {genders && genders.length > 0 && 
                                            genders.map((item, index)=>{
                                                return(
                                                    <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-4 mt-2'>
                                    <label>Chức vị</label>
                                    <select className="form-select" aria-label="Default select example"
                                        value={position}
                                        onChange={(event)=>{this.onChangeInput(event, 'position')}}
                                    >
                                        {positions && positions.length > 0 && 
                                            positions.map((item, index)=>{
                                                return(
                                                    <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-4 mt-2'>
                                    <label>Role</label>
                                    <select className="form-select" aria-label="Default select example"
                                        value={role}
                                        onChange={(event)=>{this.onChangeInput(event, 'role')}}
                                    >
                                        {roles && roles.length > 0 && 
                                            roles.map((item, index)=>{
                                                return(
                                                    <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                
                                <div className='col-4 my-3'>
                                    <label>Thêm ảnh</label><br></br>
                                    <div className='upload'>
                                        <input type='file' id='previewImg' hidden
                                            onChange={(event)=> this.handleOnchangeImg(event)}
                                        ></input>
                                        <label className='up-img' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                        <div className='preview-img' style={{backgroundImage:`url(${this.state.previewImgURL})`}}></div>
                                    </div>
                                </div>
                                <div className='col-4 mt-5'>
                                    <button className={this.state.actionCRUD===CRUD_ACTION.EDIT?'btn btn-danger':"btn btn-primary"} onClick={()=>this.handleCreateUser()}>
                                    {this.state.actionCRUD===CRUD_ACTION.EDIT? 'Lưu thay đổi': 'Tạo mới'}
                                    </button>
                                </div>
                                <div className='col-12 mb-5 mt-3'>
                                    <TableManagerUser
                                        actionCRUD={this.state.actionCRUD}
                                        handleEditUserParent = {this.handleEditUserParent}
                                    />
                                        
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUser: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch (action.fetchGenderStart()),
        getPositionStart: () => dispatch (action.fetchPositionStart()),
        getRoleStart: () => dispatch (action.fetchRoleStart()),
        createNewUser: (data) => dispatch(action.createNewUser(data)),
        fetchUserRedux: ()=> dispatch(action.fetchAllUserStart()),
        editUserRedux: (dataInput) =>dispatch(action.editUser(dataInput))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
