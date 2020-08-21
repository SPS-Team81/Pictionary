import React from 'react';
import './chatbox.css'
import { TextField } from '@material-ui/core';
import { _playerName, socket } from '../api'

export default class ChatBox extends React.Component {
    constructor() {
        super();
        this.state = {
            chatList: [["player_test", "hello", "socketid"]],
            message: "",
        }
        this.messagesRef = React.createRef();
        this.setMessage = this.setMessage.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
    }

    setMessage(event) {
        this.setState({
            message: event.target.value,
        })
    }

    handleSend() {
        var currEntry = [_playerName, this.state.message, socket.id];
        this.state.chatList.push(currEntry);
        this.setState({
            message: "",
        })
    }

    checkEnter(event) {
        if (event.keyCode === 13) {
            this.handleSend();
        }
    }

    render() {
        return (
            <div className="chat-box">
                <div className="messages" ref={this.messagesRef}>
                    <div>{this.state.chatList.map(function (item, key) {
                        if (item[2] === socket.id) {
                            return (
                                <div className="own-message">
                                    <p className="name"><b>You</b></p>
                                    <p className="message">{item[1]}</p>
                                </div>
                            );
                        } else {
                            return (
                                <div className="other-message">
                                    <p className="name"><b>{item[0]}</b></p>
                                    <p className="message">{item[1]}</p>
                                </div>
                            );
                        }

                    }, this)}
                    </div>
                </div>

                <div className="message-box">
                    <TextField
                        className="input-box"
                        variant="outlined"
                        margin="normal"
                        id="messageBox"
                        label="Enter your message here"
                        name="messageBox"
                        value={this.state.message}
                        onChange={this.setMessage}
                        onKeyDown={this.checkEnter}
                    />

                    <i className="material-icons send-button" onClick={this.handleSend}>send</i>
                </div>
            </div>
        );
    }
}
