import React from 'react';
import './timer.css'
import { socket,_roomName } from '../api.js';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            playerInfo: {},
            timestampToEnd: new Date(),
            timeremaining: 0, 
        };
    }

    componentDidMount() {
        socket.on('playerInfo',(data) => {
            this.setState({
                playerInfo: data,
            });
        });
        
        socket.on('endTimeData', (data) => {
            this.setState({
                timestampToEnd: data,
            });
        });
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    calculateTime() {
        var currentTime = new Date();
        var endTime = new Date(this.state.timestampToEnd);
        var seconds = (endTime.getTime() - currentTime.getTime()) / 1000;
        return parseInt(seconds);
    }

    tick() {
        this.setState({
            timeRemaining: this.calculateTime(),
        })
        if(this.timeRemaining == 0 && this.playerInfo.drawing) {
            socket.emit('nextTurn',{roomName: _roomName});
        }
    }

    render() {
        // const { timeRemaining } = this.state
        return (
            <div className="timer-bar">
                <h3 className="time">
                    {/* <i className="material-icons">timer</i> */}
                    {this.state.timeRemaining}
                </h3>
                {/* <div>
                    <div style={{ float: "none", margin: "auto", padding: 10, backgroundColor: "red", borderRadius: "50%", width: 250, height: 250 }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", margin: 0, fontSize: 50 }}>{this.state.timeRemaining}</div>
                    </div>
                </div> */}
            </div>
        );
    }
}
