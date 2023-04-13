import actionTypes from './actionTypes';
import { getAllCodeService, createUserService,getAllUser, delleteUserService,
    editUserService,getTopDoctorService,getAllDoctorService,saveDetailDoctor, 
    getAllSpecialtyService , getAllClinicService  } from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
    
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) =>{
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("gender")
            if(res && res.errCode ===0){
                dispatch(fetchGenderSuccess(res.data)) 
            }else{
                dispatch(fetchGenderFaided()) 
            }
        } catch (e) {
            dispatch(fetchGenderFaided()) 
            console.log('fetchGenderStart', e)
        }
    }
    
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})
// action get position
export const fetchPositionStart = () => {
    return async (dispatch, getState) =>{
        try {
            let res = await getAllCodeService("position")
            //console.log('check accton:', res.data)
            if(res && res.errCode ===0){
                dispatch(fetchPositionSuccess(res.data)) 
            }else{
                dispatch(fetchPositionFaided()) 
            }
        } catch (e) {
            dispatch(fetchPositionFaided()) 
            console.log('fetchPositionFaided', e)
        }
    }
    
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED
})
//action get role id
export const fetchRoleStart = () => {
    return async (dispatch, getState) =>{
        try {
            let res = await getAllCodeService("role")
            if(res && res.errCode ===0){
                dispatch(fetchRoleSuccess(res.data)) 
            }else{
                dispatch(fetchRoleFaided()) 
            }
        } catch (e) {
            dispatch(fetchRoleFaided()) 
            console.log('fetchRoleFaided', e)
        }
    }
    
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})

// action CREATE_USER_
export const createNewUser = (data) => {
    return async (dispatch, getState) =>{
        try {
            let res = await createUserService(data) ;
            console.log('check user redux:', res)
            if(res && res.errCode ===0){
                toast.success('Create a new user succeed!')
                dispatch(createNewUserSuccess()) 
                dispatch(fetchAllUserStart()) 

            }else{
                dispatch(createNewUserFailed()) 
            }
        } catch (e) {
            dispatch(createNewUserFailed()) 
            console.log('fetchPositionFaided', e)
        }
    }
}
export const createNewUserSuccess = ()=>({
    type: 'CREATE_USER_SUCCESS'
})
export const createNewUserFailed = ()=>({
    type: 'CREATE_USER_FAILED'
})
//get all user
export const fetchAllUserStart = () => {
    return async (dispatch, getState) =>{
        try {
            let res = await getAllUser("ALL")
            if(res && res.errCode ===0){               
                dispatch(fetchAllUserSuccess(res.users.reverse())) 
            }else{
                dispatch(fetchAllUserFaided()) 
            }
        } catch (e) {
            dispatch(fetchAllUserFaided()) 
            console.log('fetchRoleFaided', e)
        }
    }
    
}
export const fetchAllUserSuccess = (data)=>({
    type: 'FETCH_ALL_USER_SUCCESS',
    users: data
})
export const fetchAllUserFaided = ()=>({
    type: 'FETCH_ALL_USER_SUCCESS'
})
// delete user
export const deleteUser = (userId) => {
    return async (dispatch, getState) =>{
        try {
            let res = await delleteUserService(userId) ;
            if(res && res.errCode ===0){
                toast.success('Delete the user succeed!')
                dispatch(deleteUserSuccess())
                // load danh sach user 
                dispatch(fetchAllUserStart()) 

            }else{
                toast.error('Delete the user failed!')
                dispatch(deleteUserFailed()) 
            }
        } catch (e) {
            dispatch(deleteUserFailed()) 
            console.log('fetchPositionFaided', e)
        }
    }
}
export const deleteUserSuccess = () =>({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () =>({
    type: actionTypes.DELETE_USER_FAILED
})
// edit user
export const editUser = (dataInput) => {
    return async (dispatch, getState) =>{
        try {
            let res = await editUserService(dataInput) ;
            if(res && res.errCode ===0){
                toast.success('Update the user succeed!')
                dispatch(editUserSuccess())
                // load danh sach user 
                dispatch(fetchAllUserStart()) 

            }else{
                toast.error('Update the user failed!')
                dispatch(editUserFailed()) 
            }
        } catch (e) {
            dispatch(editUserFailed()) 
            console.log('fetchPositionFaided', e)
        }
    }
}
export const editUserSuccess = ()=>({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = ()=>({
    type: actionTypes.EDIT_USER_FAILED
})

// get doctor top
export const fetchTopDoctor = ()=>{
    return async (dispatch, getState) =>{
        try {
            let res = await getTopDoctorService('10')
            if(res&&res.errCode===0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
            console.log('check data doctor top', res)
            
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })
        }
    }
}
// get all doctor
export const fetchAllDoctor = ()=>{
    return async (dispatch, getState) =>{
        try {
            let res = await getAllDoctorService()
            if(res&&res.errCode===0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataAllDoctor: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                })
            }
            //console.log('check data doctor all', res.data)
            
        } catch (e) {
            console.log('FETCH_ALL_DOCTOR_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            })
        }
    }
}

// save detail doctor
export const saveDetailInfoDoctor = (data)=>{
    return async (dispatch, getState) =>{
        try {
            let res = await saveDetailDoctor(data)
            if(res&&res.errCode===0){
                toast.success('Save info detail doctor succeed!')
                dispatch({
                    type: actionTypes.SAVE_DETAILE_DOCTOR_SUCCESS,
                })
            }else{
                toast.error('Save info detail doctor error!')
                dispatch({
                    type: actionTypes.SAVE_DETAILE_DOCTOR_FAILED,
                })
            }
            //console.log('check data doctor all', res.data)
            
        } catch (e) {
            toast.success('Save info detail doctor error!')
            console.log('SAVE_DETAILE_DOCTOR_FAILED: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAILE_DOCTOR_FAILED,
            })
        }
    }
}

// get all code schedule time
export const fetchAllCodeScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
            //console.log('check data doctor all', res.data)

        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

// get price, payment, province, ... doctor in allCode
export const getRequireDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_START })
            let resPrice = await getAllCodeService("price")
            let resPayment = await getAllCodeService("payment")
            let resProvince = await getAllCodeService("province")
            let resClinic = await getAllClinicService()
            let resSpecialty = await getAllSpecialtyService()

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode===0
                && resProvince && resProvince.errCode===0
                && resSpecialty &&resSpecialty.errCode===0
                && resClinic && resClinic.errCode===0  ){
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequireDoctorInfoSuccess(data))
            } else {
                dispatch(fetchRequireDoctorInfoFaided())
            }
        } catch (e) {
            dispatch(fetchRequireDoctorInfoFaided())
            console.log('fetchRequireDoctorInfoFaided', e)
        }
    }

}
export const fetchRequireDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
    dataRequireDoctor: data
})
export const fetchRequireDoctorInfoFaided = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAIDED
})