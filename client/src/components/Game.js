import React from 'react';
import { Grid } from '@material-ui/core';
import Canvas from './Canvas';
import ScoreBoard from './ScoreBoard';
import Timer from './Timer';
import ChatBox from './ChatBox';
import axios from 'axios';
import {QueryGameData} from './api';
import CanvasDraw from 'react-canvas-draw';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            playerList: [],
            roundsPlayed: 0,
            totalRounds: 0,
            roundDuration: 0,
            currentWord: '',
        };
        this.queryGameData()  = this.queryGameData.bind(this);
    }

    componentDidMount() {
        this.queryGameData();
    }

    queryGameData() {
        axios.get(QueryGameData+roomName).then(res => {
            this.setState({
                playerList:res.data.playerList,
                roundsPlayed: res.data.roundsPlayed,
                totalRounds: res.data.totalRounds,
                roundDuration: res.data.roundDuration,
                currentWord: res.data.currentWord,
            });
        });
    }

    render() {
        return(
            <Grid container className="layoutContainer">
                <Grid item md={3} lg={3}>
                    <ScoreBoard />
                </Grid>

                <Grid item md={6} lg={6}>
                    <Canvas />
                </Grid>

                <Grid item md={3} lg={3}>
                    <Timer onRoundCompletion = {this.queryGameData}
                    roundDuration = {this.roundDuration}/>
                    <ChatBox onCorrectGuess = {this.queryGameData}/>
                </Grid>

            </Grid>
        );
    }
}


export default {QueryGameData};