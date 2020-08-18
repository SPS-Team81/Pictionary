import React from 'react';
import { Grid } from '@material-ui/core';
import Canvas from './Canvas';
import ScoreBoard from './ScoreBoard';
import Timer from './Timer';
import ChatBox from './ChatBox';
import {queryGameData,joinPlayerInGame} from '../api';
import CanvasDraw from 'react-canvas-draw';

function setGameData(data) {
    this.setState({
    });
} 
export default class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        joinPlayerInGame();
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
                    <Timer />
                    <ChatBox />
                </Grid>

            </Grid>
        );
    }
}

export {setGameData};