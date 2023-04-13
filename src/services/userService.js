import axios from "../axios"

const handleLoginApi = (email, password) => {
    //goi api truyen len email password input
    return axios.post('api/login', { email, password })
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createUserService = (data) => {
    // goi api truyen du lieu len server, server tra ve reponse message
    return axios.post('/api/create-users', data)
}

const delleteUserService = (userId) => {
    return axios.delete('/api/delete-users', {
        data: {
            id: userId
        }
    })
}

const editUserService = (inputData) => {
    console.log('check input data', inputData)
    return axios.put('/api/edit-users', inputData)
}

//get all code
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcodes?type=${inputType}`)

}
// get top doctor
const getTopDoctorService = (limit) => {
    return axios.get(`/api/top-doctor?limit=${limit}`)
}

// get all doctor
const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctor`)

}
// save thong tin chi tiet doctor
const saveDetailDoctor = (data) => {
    return axios.post('api/save-info-doctor', data)
}
// get detail info doctor
const getDdetalInfoDoctor = (inputId) => {
    return axios.get(`api/get-detail-doctor-by-id?id=${inputId}`)
}
// save schedule doctor
const saveBulkScheduleDoctorService = (data) => {
    return axios.post(`api/bulk-create-schedule`, data)
} 
// get schedule by id
const getScheduleByDateService = (doctorId, date) => {
    return axios.get(`api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
// get other infomation doctor by id
const getOtherInfomationDoctorService = (doctorId) => {
    return axios.get(`api/get-other-infomation-doctor-by-id?doctorId=${doctorId}`)
}

// get profile doctor
const getProfileDoctorService = (doctorId) => {
    return axios.get(`api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

// save user patient booking(table bookings)
const postPatientBookingAppointment = (dataInput) => {
    return axios.post('api/patient-book-appointment', dataInput)
}

// xac nhan dat lich thanh cong
const postVerifyBookAppointmentService = (data) => {
    return axios.post('api/verify-book-appointment', data)
}

// CREATE speciatly
const createSpeciatlyService = (data) => {
    return axios.post('api/create-new-speciatly', data)
}
//get all specialty
const getAllSpecialtyService = () => {
    return axios.get(`api/get-all-specialty`)
}
// get detail specialty and doctor in specialty
const getDetailSpecialtyService = (idSpecialty) => {
    return axios.get(`api/get-detail-specialty-by-id?id=${idSpecialty}`)
}

// create clinic
const createClinicService = (data) => {
    return axios.post('api/create-new-clinic', data)
}
//get all clinic
const getAllClinicService = () => {
    return axios.get(`api/get-all-clinic`)
}
// get detail clinic and doctor in specialty
const getDetailClinicService = (idClinic) => {
    return axios.get(`api/get-detail-clinic-by-id?id=${idClinic}`)
}
// get all patient for doctor theo date
const getAllPatientForDoctorService = (doctorId, date) => {
    return axios.get(`api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`)
}

const doneAppointmentPatientService = (data) => {
    return axios.post('api/done-appointment-patient', data)
}
export {
    handleLoginApi,
    getAllUser,
    createUserService,
    delleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorService,
    getAllDoctorService,
    saveDetailDoctor,
    getDdetalInfoDoctor, 
    saveBulkScheduleDoctorService,
    getScheduleByDateService,
    getOtherInfomationDoctorService,
    getProfileDoctorService,
    postPatientBookingAppointment,
    postVerifyBookAppointmentService,
    createSpeciatlyService,
    getAllSpecialtyService,
    getDetailSpecialtyService,
    createClinicService,
    getAllClinicService,getDetailClinicService,
    getAllPatientForDoctorService,
    doneAppointmentPatientService

}