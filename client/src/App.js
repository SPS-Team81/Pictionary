import React from 'react';
import Game from './components/Game';
import Join from './components/Join';
import LeaderBoard from './components/LeaderBoard';
import { socket } from './api'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            playerName: '',
            gameOver: true,
        };
    }

    componentDidMount() {
        socket.on('newJoinee', (tempData) => {
            var data = JSON.parse(tempData);
            if (data.status === 200) {
                this.setState({
                    roomName: data.roomName,
                    playerName: data.playerName,
                });
            } else {
                alert('This Room Does Not Exist');
            }
        });
        socket.on('playerCountUpdate', (data) => {
            this.setState({
                playerCount: data.count,
            });
        });
    }

    render() {
        if (this.state.roomName === "") {
            return (
                <Join />
            );
        } else {
            if (this.state.gameOver === false) {
                return (
                    <Game />
                );
            } else {
                return (
                    <LeaderBoard />
                )
            }
        }
    }
}
