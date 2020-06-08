import React, { Component } from "react";
import M, { AutoInit } from 'materialize-css'
import SH_1 from './imgs/SH_1.jpeg'
import SH_2 from './imgs/SH_2.jpeg'
import SH_3 from './imgs/SH_3.jpeg'
import SH_4 from './imgs/SH_4.jpeg'
import GoodCamera from './imgs/cam.jpeg'
import MedAlarm from './imgs/med.jpeg'
import motion from './imgs/motion.jpeg'
import Alarm from './imgs/Alarm.jpeg'
import './landing.css'
import { Carousel } from 'react-bootstrap'


let topSecitonStyle = {
    backgroundImage: `url(${SH_3})`,
    backgroundSize: `cover`,
    opacity: `90%`
}

let leftCenterSectionStyle = {
    backgroundImage: `url(${GoodCamera})`,
    backgroundSize: `cover`,
    opacity: `90%`
}

let rightCenterSectionStyle = {
    backgroundImage: `url(${motion})`,
    backgroundSize: `cover`,
    opacity: `90%`
}

let leftBottomSectionStyle = {
    backgroundImage: `url(${MedAlarm})`,
    backgroundSize: `cover`,
    opacity: `90%`
}

let rightBottomSectionStyle = {
    backgroundImage: `url(${Alarm})`,
    backgroundSize: `cover`,
    opacity: `90%`
}


export default class Landing extends Component {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, {});
        });
    }

    

    render() {
        return (
            <div>

                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light" style={topSecitonStyle}>
                    <div className="col-md-5 p-lg-5 mx-auto my-5" >
                        <h1 className="display-4 font-weight-normal text">High end systems</h1>
                        <p className="lead font-weight-normal text">Check out our high end security systems!</p>
                        <a className="btn btn-outline-secondary" href="https://infinite-castle-02083.herokuapp.com/category/Full%20Security%20System">Click here</a>
                    </div>
                    <div className="product-device box-shadow d-none d-md-block"></div>
                    <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3" >
                    <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden half" style={leftCenterSectionStyle}>
                        <div className="my-3 py-3">
                            <h2 className="display-5">Camera's</h2>
                            <p className="lead">Check out our camera's!</p>
                            <a className="btn btn-outline-secondary" href="https://infinite-castle-02083.herokuapp.com/category/Security%20Camera">Click here</a>
                        </div>
                        <div className="bg-light box-shadow mx-auto" ></div>
                    </div>
                    <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden half" style={rightCenterSectionStyle}>
                        <div className="my-3 p-3">
                            <h2 className="display-5">Motion detectors</h2>
                            <p className="lead2">Check out our motion detectors</p>
                            <a className="btn btn-outline-secondary" href="https://infinite-castle-02083.herokuapp.com/category/Motion%20Sensors">Click here</a>
                        </div>
                        <div className="bg-dark box-shadow mx-auto" ></div>
                    </div>
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                    <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden half" style={leftBottomSectionStyle}>
                        <div className="my-3 p-3">
                            <h2 className="display-5">Medical Alarms</h2>
                            <p className="lead2">Check out the medical alarms we offer!</p>
                            <a className="btn btn-outline-secondary" href="https://infinite-castle-02083.herokuapp.com/category/Medical%20Alarm">Click here</a>
                        </div>
                        <div className="bg-dark box-shadow mx-auto" ></div>
                    </div>
                    <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden half" style={rightBottomSectionStyle}>
                        <div className="my-3 py-3">
                            <h2 className="display-5">Alarms</h2>
                            <p className="lead">Check out the alarms we offer</p>
                            <a className="btn btn-outline-secondary" href="https://infinite-castle-02083.herokuapp.com/category/Alarm">Click here</a>
                        </div>
                        <div className="bg-light box-shadow mx-auto"></div>
                    </div>
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">


                </div>

                <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">


                </div>
            </div>



        )
    }
}
