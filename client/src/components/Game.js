import React from 'react';
import { Grid } from '@material-ui/core';
import Canvas from './Canvas';
import ScoreBoard from './ScoreBoard';
import Timer from './Timer';
import ChatBox from './ChatBox';
import {queryGameData} from '../api';
import CanvasDraw from 'react-canvas-draw';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: 'ppagvxf',
            playersList: [],
            roundsPlayed: 0,
            totalRounds: 0,
            roundDuration: 0,
            currentWord: '',
        };
        this.fetchData  = this.fetchData.bind(this);
        // this.fetchData();
    }

    componentDidMount() {
        this.fetchData() 
    }

    fetchData() {
        queryGameData(this.state.roomName,(err,data) => {
            this.setState({
                playersList: data.playerList,
                roundsPlayed: data.roundsPlayed,
                totalRounds: data.totalRounds,
                roundDuration: data.roundDuration,
                currentWord: data.currentWord,
            });
        });
        
    }

    render() {
        return(
            <Grid container className="layoutContainer">
                <Grid item md={3} lg={3}>
                    <ScoreBoard playersList={this.state.playersList}/>
                </Grid>

                <Grid item md={6} lg={6}>
                    <Canvas />
                </Grid>

                <Grid item md={3} lg={3}>
                    <Timer onRoundCompletion = {this.queryGameData}
                    roundDuration = {this.state.roundDuration}/>
                    <ChatBox onCorrectGuess = {this.queryGameData}/>
                </Grid>

            </Grid>
        );
    }
}

