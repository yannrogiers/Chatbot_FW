import React from 'react';


//Maken function component dat text message rendert
const Message = (props) => {
    return (
        <div className="col s12 m8 offset-m2 offset-l3">
            <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    {props.speaks === 'bot' &&
                        <div className="col s2">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red">{props.speaks}</a>
                        </div>
                    }
                    <div className="col s10">
                        <span className="black-text">
                            {props.text}
                        </span>
                    </div>
                    {props.speaks === 'user' &&
                        <div className="col s2">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red">{props.speaks}</a>
                        </div>
                    }
                </div>
            </div>
        </div>
        //How does this work?
        // In java script (if we have true & expression) it will always evaluate the expression therefore props.speak is true and the expression
        //after it is returned & displayed
        // expression = true && expression (JSX code)
    );
};

export default Message

