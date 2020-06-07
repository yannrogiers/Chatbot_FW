import React from 'react';
import './card.css'
const Card = (props) => {


    return (
        <div className="big-card"  style={{float: 'left', paddingRight:30, width:300}}>
            <div className="card">
                <div className="card-image" style={{width: 240}}>
                    <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue} />
                    <span className="card-title">{props.payload.fields.header.stringValue}</span>
                </div>
                <div className="card-content">
                    {props.payload.fields.description.stringValue}
                    <p> <a  href="/">{props.payload.fields.price.stringValue}</a></p>
                </div>
                <div className="card-action">
                    <a target="_blank"  rel="noopener noreferrer" href={props.payload.fields.link.stringValue}>VIEW IN SHOP</a>
                </div>
            </div>
        </div>
    );
};

export default Card; 