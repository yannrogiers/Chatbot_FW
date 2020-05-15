import React, { Component } from 'react';
import axios from 'axios/index';
import Message from './Message';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Card from './Card'
import QuickReplies from './QuickReplies';
import{withRouter} from 'react-router-dom'


//Cookies als eerste initializen, dit is geen deel van de DOM
const cookies = new Cookies();

class Chatbot extends Component {

    messagesEnd;
    talkInput;
    //adding state
    constructor(props) {
        //pass to parent component
        super(props);

        //This binding nodig om "this" te laten werken in de callback
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

        this.hide = this.hide.bind(this)
        this.show = this.show.bind(this)

        //in state messages get stored
        this.state = {
            //set empty message array
            messages: [],
            showBot: true,
            shopWelcomeSent: false
        };
        //Zet cookie, eerste param is cookie naam, 2e param is value van de cookie, 3e param zijn opties (cookie accessible op alle pages)
        //Kijken of cookie reeds exist
        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
        console.log(cookies.get('userID'));
    }

    async df_text_query(text) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            }
        };
        //New state will be set, messages will become a new array that contains old messages with new messages
        this.setState({ messages: [...this.state.messages, says] });
        const res = await axios.post('/api/df_text_query', { text, userID: cookies.get('userID') });
        for (let msg of res.data.fulfillmentMessages) {
            //    console.log(JSON.stringify(msg))
            says = {
                speaks: 'bot',
                msg: msg
            };
            this.setState({ messages: [...this.state.messages, says] });
        }

    }

    async df_event_query(event) {
        const res = await axios.post('/api/df_event_query', { event, userID: cookies.get('userID') });

        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speak: 'bot',
                msg: msg
            };
            this.setState({ messages: [...this.state.messages, says] })
        }
    }

    resolveAfterXSecondes (x){
        return new Promise (resolve => {
            setTimeout(() => {
                resolve(x);
            }, x * 1000);
        });
    }

    async componentDidMount() {
        this.df_event_query('Welcome');

        await this.resolveAfterXSecondes(2);
        if(window.location.pathname === '/shop' && !this.state.shopWelcomeSent){
            this.df_event_query('WELCOME_SHOP');
            this.setState({shopWelcomeSent: true, showBot:true});
        }

        this.props.history.listen(() => {
            console.log('listening');
            //navigatie naar shop volgen zodat chatbot een spceciale message sent related voor shop & checken of shop nog
            //niet eerder bezocht is.
            if (this.props.history.location.pathname === "/shop" && !this.state.shopWelcomeSent){
                this.df_event_query('WELCOME_SHOP');
                this.setState({shopWelcomeSent: true, showBot:true});
            }
        });
    }


    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behaviour: "smooth" })
        if (this.talkInput){
            this.talkInput.focus();
        }
    }

    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showBot: true });
       
    }

    hide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showBot: false });
    }

    _handleQuickReplyPayload(event, payload, text) {
        event.preventDefault();
        event.stopPropagation();

        switch (payload) {
            case 'recommend_yes':
                this.df_event_query('SHOW_RECOMMENDATIONS');
                break;
            case 'best_master':
                this.df_event_query('MASTERSYSTEM');
                break;
            default:
                this.df_text_query(text);
                break;
        }
    }

    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
    }


    renderOneMessage(message, i) {
        if (message.msg && message.msg.text && message.msg.text.text) {
            //Here we pass text
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
            //Check for type of message if card create card
        } else if (message.msg
            && message.msg.payload.fields.cards) {
            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{ overflow: 'hidden' }}>
                        <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                    </div>
                    <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                        <div style={{ height: 300, width: message.msg.payload.fields.cards.listValue.values.length * 270 }}>
                            {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                        </div>
                    </div>
                </div>
            </div>
        } else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.fields &&
            message.msg.payload.fields.quick_replies
        ) {
            return <QuickReplies
                text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.payload.fields.quick_replies.listValue.values} />
        }
    }
    //implementeren rendermessage in component (deze is verantwoordelijk voor het renderen van messages)
    renderMessages(stateMessages) {
        if (stateMessages) {
            //to the message component we pass speaks
            return stateMessages.map((message, i) => {
                return this.renderOneMessage(message, i)

            });
        } else {
            return null;
        }
    }
    //Keys help react identify which items have been changed, added or removed
    //Keys worden gegeven aan elementen binnen array om de elementen een stabiele identiteit te geven.

    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    render() {
        if (this.state.showBot) {
            return (
                <div style={{ height: 500, width: 400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgrey' }}>
                    <nav>
                        <div className="nav-wrapper">
                            <a className="brand-logo" style={{ marginLeft: '5%' }}>Security at Home</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.hide}>Close</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div id="chatbot" style={{ height: 388, width: '100%', overflow: 'auto' }}>
                        {this.renderMessages(this.state.messages)}
                        <div ref={(el) => { this.messagesEnd = el; }}
                            style={{ float: 'left', clear: 'both' }}>
                        </div>
                    </div>
                    <div className="col s12">
                        <input style={{ margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%' }} ref={(input) => {this.talkInput = input; }}
                        placeholder="Type a message!" onKeyPress={this._handleInputKeyPress} 
                         id="user_says" type="text"/>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ height: 40, width: 400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgrey' }}>
                    <nav>
                        <div className="nav-wrapper">
                            <a className="brand-logo" style={{ marginLeft: '5%' }}>Security at Home</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.show}>Show</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div ref={(el) => {this.messagesEnd = el; }}
                    style={{float: "left", clear: "both"}}>
                        
                    </div>
                    
                </div>
            )
        }
    }
}


export default withRouter(Chatbot) ;