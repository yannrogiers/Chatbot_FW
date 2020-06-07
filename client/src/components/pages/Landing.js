import React, { Component } from "react";
import M from 'materialize-css'
import SH_1 from './imgs/SH_1.jpeg'
import SH_2 from './imgs/SH_2.jpeg'
import SH_3 from './imgs/SH_3.jpeg'
import SH_4 from './imgs/SH_4.jpeg'
import './landing.css'
import { Carousel } from 'react-bootstrap'




export default class Landing extends Component {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, {});
        });
    }

    render() {
        return (

            <div className="container-fluid">
                <img className='img' src={SH_1} alt="homepage-1" />
            </div>

        )
    }
}
