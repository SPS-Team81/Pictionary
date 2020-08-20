import React from 'react';
import './chatbox.css'
import { TextField, makeStyles } from '@material-ui/core';
import { _playerName } from '../api'

export default class ChatBox extends React.Component {
    constructor() {
        super();
        this.state = {
            chatList: [],
            message: "",
        }
        this.setMessage = this.setMessage.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    setMessage(event) {
        this.setState({
            message: event.target.value,
        })
    }

    handleSend() {
        var currEntry = [_playerName, this.state.message];
        this.state.chatList.push(currEntry);
        this.setState({
            message: "",
        })
    }

    render() {
        return (
            <div className="chat-box">
                <div className="messages">
                    <div>{this.state.chatList.map(function (item, key) {
                        return (
                            <p key={key}>{item[0]} {item[1]}</p>
                        )
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
                    />

                    <i className="material-icons send-button" onClick={this.handleSend}>send</i>
                </div>
            </div>
        );
    }
}
