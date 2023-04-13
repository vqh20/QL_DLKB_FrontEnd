import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpeciatly.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils} from '../../../utils'
import {toast} from 'react-toastify'
import {createSpeciatlyService} from '../../../services/userService'


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpeciatly extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nameSpeciatly:'',
            imgBase64:'',
            descriptionHTML:'',
            descriptionMarkdown:''


        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
       
    }
    handleEditorChange=({html, text})=>{
        this.setState({
            descriptionHTML:html,
            descriptionMarkdown:text
        })
    }

    handleOnchangInput=(event, id)=>{
        let stateCopy={...this.state}
        stateCopy[id]=event.target.value
        this.setState({
            ...stateCopy
        })
    }
    handleOnchangeImg = async(event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file)
            
            //let objectUrl = URL.createObjectURL(file)
            this.setState({
                imgBase64: base64,
    
            })
        }
        console.log('check file', file)
    }
    handleOnclickSave=async()=>{
        let res = await createSpeciatlyService(this.state)
        console.log('check state', res)
        if(res && res.errCode ===0){
            toast.success('Tạo mới thành công')
            this.setState({
                nameSpeciatly:'',
                imgBase64:'',
                descriptionHTML:'',
                descriptionMarkdown:''
            })
        }else{
            toast.error('Tạo mới thấy bại')
        }
    }
    render() {
        
        return (
            <>
                <div className='manage-speciatly-container'>
                    <div className='title-speciatly mb-5'>Quản lý chuyên khoa</div>

                    <div className='add-new-speciatly row'>
                        <div className='col-6 form-group mb-3'>
                            <label>Tên chuyên khoa</label>
                            <input className='form-control' type='text' value={this.state.nameSpeciatly}
                                onChange={(event)=>{this.handleOnchangInput(event,'nameSpeciatly')}}
                            ></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Image</label><br></br>
                            <input className='form-control-file' type='file'
                                onChange={(event)=>this.handleOnchangeImg(event
                                    )}
                            ></input>
                        </div>

                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value = {this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button className='btn-save'
                                onClick={()=>this.handleOnclickSave()}
                            >Lưu chuyên khoa</button>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpeciatly);
