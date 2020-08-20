import React from 'react';
import './timer.css'
import { socket } from '../api.js';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            timestampToEnd: new Date(),
            timeremaining: 0, 
        };
    }


    // var startDate = new Date();
    // // Do your operations
    // var endDate   = new Date();
    // var seconds = (endDate.getTime() - startDate.getTime()) / 1000;

    componentDidMount() {
        socket.on('newRoundUpdate', (data) => {
            let dataJson = JSON.parse(data);
            this.setState({
                timeRemaining: dataJson.roundDuration,
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
        var seconds = (currentTime.getTime() - endTime.getTime()) / 1000;
        return parseInt(seconds);
    }

    tick() {
        // if(timeRemaining == 0) {
        //     axios.get()
        // }  
        this.setState({
            timeRemaining: this.calculateTime(),
        })
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
