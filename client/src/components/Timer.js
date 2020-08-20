import React from 'react';
import './timer.css'
import { socket } from '../api.js';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timeRemaining: 0 };
    }

    componentDidMount() {
        socket.on('playerChangeUpdate', (data) => {
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

    tick() {
        // if(timeRemaining == 0) {
        //     axios.get()
        // }  
        this.setState(({ timeRemaining }) => ({
            timeRemaining: timeRemaining - 1
        }));
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
