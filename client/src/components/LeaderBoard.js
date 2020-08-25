import React from 'react';
import { Grid, Table, TableBody, TableRow, TableCell, Button } from '@material-ui/core';
import './leaderboard.css';
import { socket } from '../api';

export default class LeaderBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            playersList: [{ username: "player1", points: 80 }, { username: "player2", points: 50 }],
        }
    }

    componentDidMount() {
        socket.on('leaderboard', (data) => {
            this.setState({
                playersList: data,
            });
        });
    }

    render() {
        return (
            <Grid container className="layoutConatiner">
                <Grid item md={4} lg={4}></Grid>

                <Grid item md={4} lg={4}>
                    <div className="board">
                        <h1 className="title">Game Over</h1>
                        <img src="https://i.pinimg.com/originals/44/d5/ff/44d5ff705fd223c4cddd1cdc1e2eefa1.jpg" alt="" style={{ width: 90, height: 60}}></img>
                        <h2>Leaderboard</h2>
                        <Table>
                            <TableBody>{this.state.playersList.map(function (item, key) {
                                return (
                                    <TableRow key={key} className="row">
                                        <TableCell style={{ textAlign: "center", fontSize: 30 }}>{item.username}</TableCell>
                                        <TableCell style={{ textAlign: "center", fontSize: 30 }}>{item.points}</TableCell>
                                    </TableRow>
                                )
                            }, this)}
                            </TableBody>
                        </Table>
                    </div>
                </Grid>

                <Grid item md={4} lg={4}></Grid>

            </Grid>
        );
    }
}