import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss'

class About extends Component {  

    render() {
        
        return (
            <>
                <div className='sectin-about'>
                    <div className='section-about-header'>Truyền thông nói về ReactJS</div>
                    <div className='section-about-body'>
                        <div className='body-video'>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/x0fSBAgBrOQ?list=PL_-VfJajZj0UXjlKfBwFX73usByw3Ph9Q" title="ReactJS là gì? Tại sao nên học ReactJS?" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                        <div className='body-img'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
