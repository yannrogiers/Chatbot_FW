import React, { Component } from "react";
import M from 'materialize-css'
import SH_1 from './imgs/SH_1.jpeg'
import SH_2 from './imgs/SH_2.jpeg'
import SH_3 from './imgs/SH_3.jpeg'
import SH_4 from './imgs/SH_4.jpeg'
import './landing.css'




export default class Landing extends Component {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, {});
        });
    }

    render() {
        return (
            <div className="slider" options={{indicators:false}} >
                <ul className="slides">
                    <li>
                        <img src={SH_1} alt={SH_1}/>
                        <div className="caption center-align">

                            <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
                        </div>
                    </li>
                    <li>
                        <img src={SH_2} alt={SH_1}/>
                        <div className="caption left-align">

                            <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
                        </div>
                    </li>
                    <li>
                        <img src={SH_3} alt={SH_1}/>
                        <div className="caption right-align">

                            <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
                        </div>
                    </li>
                    <li>
                        <img src={SH_4} alt={SH_1}/>
                        <div className="caption right-align">

                            <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
