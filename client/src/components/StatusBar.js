import React from 'react';
import './statusbar.css'
import { _roomName } from '../api';

export default class StatusBar extends React.Component {
    constructor() {
        super();
        this.state = {
            currentRound: 1,
            totalRounds: 5,
            word: "Hell",
            player: { drawing: true },
        }
    }

    render() {
        return (
            <div className="status-bar">
                <table>
                    <tr>
                        <th className="room-id">
                            <h3 className="text">Room ID: {_roomName}</h3>
                        </th>

                        <th className="round-info">
                            <h3 className="text">Round {this.state.currentRound} of {this.state.totalRounds}</h3>
                        </th>

                        <th className="word">
                            {this.state.player.drawing === true &&
                                <h3 className="text">{this.state.player.drawing === true && this.state.word}</h3>
                            }
                        </th>
                    </tr>
                </table>

            </div>
        )
    }
}