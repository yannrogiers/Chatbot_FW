import React from "react";
import './about.css'
import SH_2 from './imgs/SH_1.jpeg'

let topSecitonStyle = {
    backgroundImage: `url(${SH_2})`,
    backgroundSize: `cover`,
    opacity: `90%`
}

const About = () =>
    (
        <div class="container-fluid center-text">
            <div class="row">
                <div class="col-md-12">
                    <h2>Welcome to Security at Home</h2>
                    <h4>Find out more about this project right here.</h4>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="d-md-flex flex-md-equal w-100 my-md-6 pl-md-6" >
                <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden half" >
                    <div className="my-1 py-1">
                        <h2 className="display-5">What is Security at Home?</h2>
                        <p className="lead">Security at Home is a final work project about home security. It's a website with a custom build in chatbot
                        that can answer most of your questions about security. The bot is also able to recommend certain products when you ask for them.
                        There is also the posibility to have a normal conversation with the chatbot.
                        Furthermore you can also buy items from the shop and register yourself.</p>
                    </div>
                    <div className="bg-light box-shadow mx-auto" ></div>
                </div>
                <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden half" style={topSecitonStyle} >
                    <div className="my-3 p-3">


                    </div>
                    <div className="bg-dark box-shadow mx-auto" ></div>
                </div>
            </div>
        
            <div className="background-about">
                <h4>SOME NUMBERS...</h4>
                <br></br>
                <div class="row bckgr">
                    <div class="col-md-3">
                        <p>On average, a burglary happens once every 26 seconds.</p>
                    </div>
                    <div class="col-md-3">
                        <p>The average loss from a burglary is $2,799.</p>
                    </div>
                    <div class="col-md-3">
                        <p>People worry about burglary more than any other property crime.</p>
                    </div>
                    <div class="col-md-3">
                        <p>Burglaries are more frequent during the summer months.</p>
                    </div>
                </div>
            </div>

        </div>


    )


export default About;