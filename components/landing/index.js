import React, { Component } from 'react'

import Header from './Header'
import Intro from './Intro'
import Main from './Main'
import '../../css/landing.css'

export class index extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
                <Header />
                <Intro />  
                <Main />  
                <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
            </>

        )
    }
}

export default index
