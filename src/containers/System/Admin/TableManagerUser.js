import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./TableManagerUser.scss"
import * as action from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManagerUser extends Component {

    constructor(prosp){
        super(prosp);
        this.state = {
            userRedux:[]
        }
    }

    componentDidMount(){
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState,snapshot ){
        if(prevProps.listUser !== this.props.listUser){
            this.setState({
                userRedux: this.props.listUser
            })
        }
    }
    handleDeleteUser = (user)=>{
        //console.log('user', user)
        this.props.deleteUserRedux(user.id)
    }
    handleEditUser =(user)=>{
        console.log('check edit', user)
        this.props.handleEditUserParent(user)
    }
    render() {  
        let arrUser = this.state.userRedux
        console.log('check user get all', this.props.listUser) 
        console.log('check state get all', this.state.userRedux)     
        return (
            <>
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>email</th>
                            <th>first name</th>
                            <th>last name</th>
                            <th>address</th>
                            <th>action</th>
                        </tr>
                        {
                            arrUser&&arrUser.length > 0 &&
                            arrUser.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='button-action-edit' onClick={()=>this.handleEditUser(item)}><i className='fas fa-pencil-alt edit-action'></i></button>
                                            <button className='button-action-delete' onClick={()=>this.handleDeleteUser(item)}><i className='fas fa-trash delete-action'></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                                    
                    </tbody>                
                </table>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </>

        )
           

}
}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: ()=> dispatch(action.fetchAllUserStart()),
        deleteUserRedux: (id)=>dispatch(action.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
