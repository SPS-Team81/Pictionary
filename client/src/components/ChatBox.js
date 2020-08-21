import React from 'react';
import './chatbox.css'
import { TextField } from '@material-ui/core';
import { _playerName, socket, _roomName } from '../api'

export default class ChatBox extends React.Component {
    constructor() {
        super();
        this.state = {
            chatList: [],
            message: "",
        }
        this.messagesEndRef = React.createRef();
        this.setMessage = this.setMessage.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    appendMessage(list,entry) {
        list.push(entry);
        return list;
    }

    componentDidMount() {
        this.scrollToBottom();
        socket.on('revieveMessage',(data) => {
            console.log('Message :'+ data.data);
            this.setState({
                chatList: this.appendMessage(this.state.chatList,data.data),
            });
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }


    setMessage(event) {
        this.setState({
            message: event.target.value,
        })
    }

    handleSend() {
        
        var  data = {
            roomName: _roomName,
            message: this.state.message,
        };
        socket.emit('sendMessage',data);

        this.setState({
            message: "",
        })
    }

    render() {
        return (
            <div className="chat-box">
                <div className="messages">
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
                    <div ref={this.messagesEndRef} />
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
