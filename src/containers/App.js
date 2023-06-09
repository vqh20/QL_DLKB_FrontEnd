import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from '../containers/Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
// cuon chuot
import CustomScrollbars from '../components/CustomScrollbars';

import HomePage from '../containers/HomePage/HomePage'
import DetailDoctor from './HomePage/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';

import { CustomToastCloseButton } from '../components/CustomToast';
import VerifyEmail from './HomePage/Doctor/VerifyEmail';
import DetailSpecialty from './HomePage/Specialty/DetailSpecialty';
import DetailClinic from './HomePage/Clinic/DetailClinic';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <span className="content-container">
                            <CustomScrollbars style={{height: '100vh', width: '100%'}}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />

                                    <Route path={'/doctor'} component={userIsAuthenticated(Doctor)} />


                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAILDOCTOR} component={DetailDoctor}/>  
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty}/>  
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic}/>  

                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />  

                                </Switch>
                            </CustomScrollbars>
                        </span>


                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
/>
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);