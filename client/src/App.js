import React from 'react';
import Game from './components/Game';
import Join from './components/Join';
import { socket,_roomName } from './api'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: '', 
            playerName: '',
        };
    }

    componentDidMount() {
        socket.on('newJoinee',(tempData) => {
            var data  = JSON.parse(tempData);
            if(data.status==200) {
                this.setState({
                    roomName: data.roomName,
                    playerName: data.playerName,
                });
            } else {
                alert('This Room Does Not Exist');
            }
        });
    }

    render() {
        if (this.state.roomName === "") {
            return (
                <Join />
            );
        } else {
            return (
                <Game />
            );
        }
    }
}
