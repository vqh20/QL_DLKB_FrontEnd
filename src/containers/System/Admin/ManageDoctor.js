import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageDoctor.scss"
import * as action from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, languages } from '../../../utils'
import { getDdetalInfoDoctor } from '../../../services/userService'

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//   ];

class ManageDoctor extends Component {

    constructor(prosp) {
        super(prosp);
        this.state = {
            //save to markDown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctor: [],
            // check create or edit data thông tin bác sĩ
            hasOldData: false,

            // save to doctor-info table
            listPrice:[],
            listPayment:[],
            listProvince:[],
            listSpecialty:[],
            listClinic: [],

            selectedPrice:'',
            selectedPayment:'',
            selectedProvince:'',
            selectClinic:'',
            selectSpecialty:'',

            nameClinic:'',
            addressClinic:'',
            note:'',
            clinicId:'',
            specialtyId:''



        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.getRequireDoctorInfoRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'DOCTOR')
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.allRequireDoctorInfo !== this.props.allRequireDoctorInfo){
            console.log('check prosp allRequireDoctorInfo', this.props.allRequireDoctorInfo)
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic} = this.props.allRequireDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            
            console.log('check data dataSelectClinic>>>>>>>>>>>>>>', dataSelectClinic)

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
           
        }
    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkDown = () => {
        console.log('check state>>>>>>>>', this.state)
        let {hasOldData} = this.state

        this.props.saveDetailInfoDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,

            clinicId: this.state.selectClinic&& this.state.selectClinic.value ? this.state.selectClinic.value: '',
            specialtyId: this.state.selectSpecialty.value
        })
        // thêm
        this.setState({
            hasOldData: true,
            // selectedOption: ''
        })
        console.log('check state markdonw:', this.state)
    }
    //


    handleChangeSelect = async (selectedOption) => {
        //khi onchange set lai state hien thi option đã chọn
        this.setState({ selectedOption})
        //console.log('check selectedOption', selectedOption)
        let { listPrice,listPayment,listProvince, listSpecialty , listClinic}= this.state

        let res = await getDdetalInfoDoctor(selectedOption.value)
        if(res && res.errCode === 0 && res.data&&res.data.Markdown){
            let markdonw = res.data.Markdown

            
            let addressClinic = '', paymentId = '', priceId = '',
             provinceId = '', note = '', nameClinic='', specialtyId='', clinicId=''

            let selectPayment = '', selectPrice = '', selectProvince='',
            selectSpecialty = '', selectClinic=''
            if(res.data.Doctor_info){
                note = res.data.Doctor_info.note
                nameClinic = res.data.Doctor_info.nameClinic
                addressClinic = res.data.Doctor_info.addressClinic

                paymentId = res.data.Doctor_info.paymentId
                priceId = res.data.Doctor_info.priceId
                provinceId = res.data.Doctor_info.provinceId
                specialtyId = res.data.Doctor_info.specialtyId
                clinicId = res.data.Doctor_info.clinicId

                // lọc listPayment(list option payment) trả về item là 1 option{label:, value:} // đk : item.value === paymentId
                 selectPayment = listPayment.find(item=>{
                    return item && item.value === paymentId
                })
                selectPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                 selectProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectSpecialty = listSpecialty.find(item=>{
                    return item && item.value === specialtyId
                })
                selectClinic = listClinic.find(item=>{
                    return item && item.value === clinicId
                })
            }
            this.setState({
                // nếu get dc data detail doctor => hiển thị data lên input => set hasOldData : true  => update database
                contentHTML: markdonw.contentHTML,
                contentMarkdown: markdonw.contentMarkdonw,
                description: markdonw.description,
                hasOldData: true,
                //
                addressClinic: addressClinic,
                note: note,
                nameClinic: nameClinic,

                selectedPrice: selectPrice,
                selectedPayment: selectPayment,
                selectedProvince: selectProvince,
                selectSpecialty: selectSpecialty,
                selectClinic: selectClinic
            })
            //console.log('check state contentMarkdown:', this.state.contentMarkdown )
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description:'',
                hasOldData: false,


                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectSpecialty:'',
                selectClinic:'',
                
                nameClinic: '',
                addressClinic: '',
                note: '',

                
            })
        }
        //console.log('check data select get', res)
    }
    
    handleOnchangeSelectDoctorInfo = async (selectedOption, name) => { //selectedOption: react-select tra ve
        let stateName = name.name // selectedPrice, selectedPayment, selectedProvince: '',
        let stateCopy = {...this.state}
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
        //console.log('check new handleOnchangeSelectDoctorInfo ', selectedOption, name)
    }

    handleOnChangeText = (event, id) => {
        let copyState = {...this.state}
        // gán state có name description(lay theo id) = event.target.value
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    buildDataInputSelect = (inputData, type) => {
        let result = []
        if (inputData && inputData.length > 0) {
            if(type === 'DOCTOR'){
                inputData.map((item, index) => {
                    let object = {}
                    object.label = `${item.lastName} ${item.firstName}`
                    object.value = item.id
                    result.push(object)
                })
            }
            if(type==='PRICE'){
                inputData.map((item, index) => {
                    let object = {}
                    object.label = `${item.valueVi}`
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if(type === 'PAYMENT' || type==='PROVINCE'){
                inputData.map((item, index) => {
                    let object = {}
                    object.label = `${item.valueVi}`
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if(type==='SPECIALTY'){
                inputData.map((item, index)=>{
                    let object={};
                    object.label=item.name;
                    object.value=item.id
                    result.push(object)
                })
            }
            if(type==='CLINIC'){
                inputData.map((item, index)=>{
                    let object={};
                    object.label=item.name;
                    object.value=item.id
                    result.push(object)
                })
            }
            
        }
        return result
    }
    render() {
        console.log('check all doctor hung', this.state)
        console.log('check this.state.listPrice', this.state.listProvince)
        let { hasOldData , } = this.state
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>thêm thông tin bác sĩ</div>
                <div className='manage-docter-markdonw'>
                    <div className='doctor-introduce'>
                        <div className='connten-left form-group'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                placeholder={'Chọn bác sĩ'}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                                value={this.state.selectedOption}
                                name={'selectedOption'}
                            />
                        </div>

                        <div className='content-right '>
                            <label>Thông tin giới thiệu</label>
                            <textarea
                                className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'description')}
                                value={this.state.description}
                            ></textarea>
                        </div>
                        

                    </div>
                   
                    {/*  */}
                        <div className='doctor-more-info row'>
                        <div className='col-3 form-group mb-3'>
                            <label>Tỉnh thành</label>
                            <Select
                                placeholder={'Chọn tỉnh thành'}
                                name={'selectedProvince'}
                                value={this.state.selectedProvince}
                                onChange={this.handleOnchangeSelectDoctorInfo}
                                options={this.state.listProvince}
                            />
                        </div>
                            <div className='col-3 form-group mb-3'>
                                <label>Chọn giá</label>
                            <Select
                                placeholder={'Chọn giá'}
                                name={'selectedPrice'}
                                value={this.state.selectedPrice}
                                onChange={this.handleOnchangeSelectDoctorInfo}
                                options={this.state.listPrice}
                            />
                            </div>
                        
                        <div className='col-3 form-group mb-3'>
                                <label>Phương thức thanh toán</label>
                            <Select
                                placeholder={'Chọn phương thức thanh toán'}
                                name={'selectedPayment'}
                                value={this.state.selectedPayment}
                                onChange={this.handleOnchangeSelectDoctorInfo}
                                options={this.state.listPayment}
                            />
                            </div>
                        <div className='col-3 form-group mb-3'>
                            <label>Tên phòng khám</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            ></input>
                        </div>
                        <div className='col-3 form-group mb-3'>
                            <label>Địa chỉ phòng khám</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            ></input>
                        </div>
                        <div className='col-3 form-group mb-3'>
                            <label>Note</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            ></input>
                        </div>
                        {/*  */}
                        <div className='col-3 form-group mb-3'>
                            <label>Chuyên khoa</label>
                            <Select
                                placeholder={'Chọn chuyên khoa'}
                                name={'selectSpecialty'}
                                value={this.state.selectSpecialty}
                                onChange={this.handleOnchangeSelectDoctorInfo}
                                options={this.state.listSpecialty}
                            />
                        </div>
                        <div className='col-3 form-group mb-3'>
                            <label>Cơ sở y tế</label>
                            <Select
                                placeholder={'Chọn cơ sở y tế'}
                                name={'selectClinic'}
                                value={this.state.selectClinic}
                                onChange={this.handleOnchangeSelectDoctorInfo}
                                options={this.state.listClinic}
                            />
                        </div>
                    </div>
                  

                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value = {this.state.contentMarkdown}
                    />
                </div>
                <button className={hasOldData ? 'edit-content-doctor' : 'save-content-doctor'}
                    onClick={() => this.handleSaveContentMarkDown()}
                >{hasOldData ? 'Lưu thay đổi': 'Lưu thông tin'}</button>
            </div>

        )


    }
}

const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        allRequireDoctorInfo: state.admin.allRequireDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(action.fetchAllDoctor()),
        getRequireDoctorInfoRedux: () => dispatch(action.getRequireDoctorInfo()),

        saveDetailInfoDoctorRedux: (data) => dispatch(action.saveDetailInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
