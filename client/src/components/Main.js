import React from 'react';
import { Grid } from '@material-ui/core';
import Canvas from './Canvas';
import ScoreBoard from './ScoreBoard';
import Timer from './Timer';
import ChatBox from './ChatBox';
import CanvasDraw from 'react-canvas-draw';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersList: [{username: "Player1", points: "100"}, {username: "Player2", points: "80"}, {username: "Player3", points: "120"}]
        }
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
                    <Timer />
                    <ChatBox />
                </Grid>

            </Grid>
        );
    }
}