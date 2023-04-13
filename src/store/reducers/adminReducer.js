import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders:[],
    roles:[],
    positions:[],
    users: [],
    topDoctor:[],
    allDoctor:[],
    allSchduleTime:[],
    allRequireDoctorInfo:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:

            var copyState = {...state}
            copyState.isLoadingGender = true
            return {
                ...copyState,
                
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state,
                    
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGender = false
            state.genders = []

            return {
                ...state,
                    
            }
            // position
        case actionTypes.FETCH_POSITION_SUCCESS:
            
            state.positions = action.data   
            return {
                ...state,                    
            }
        case actionTypes.FETCH_POSITION_FAIDED:
            state.positions = []
    
            return {
                ...state,                       
            }
            // role id
        case actionTypes.FETCH_ROLE_SUCCESS:
            
        state.roles = action.data   
            return {
                ...state,                    
            }
        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = []
    
            return {
                ...state,                       
            }
            // get all user
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users
            return{
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = []
            return{
                ...state
            }
            // top doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.dataDoctor
            return{
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctor = []
            return{
                ...state
            }
            // get all doctor
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.dataAllDoctor
            return{
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctor = []
            return{
                ...state
            }
        default:
            return state;
        // get data time  (bang allCode)
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allSchduleTime = action.dataTime
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allSchduleTime = []   
            return {
                ...state
            }
            // get require doctor info
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS:
            state.allRequireDoctorInfo = action.dataRequireDoctor
            //console.log('check action reducer', action)
            return {
                ...state
            }
            
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAIDED:
            state.allRequireDoctorInfo = []
            return {
                ...state
            }
    }
}


export default adminReducer;