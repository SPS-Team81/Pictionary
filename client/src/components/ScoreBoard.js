import React from 'react';
import './scoreboard.css';
import { Table, TableBody, TableCell, TableContainer, TableRow, Button } from '@material-ui/core';
import { socket } from '../api.js';

export default class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersList: [],
        };
        // console.log('props: '+props.playersList.length)
    }

    componentDidMount() {
        socket.on('playerChangeUpdate', (data) => {
            let dataJson = JSON.parse(data);
            this.setState({
                playersList: dataJson.playersList,
            });
        });
    }

    render() {
        return (
            <div className="score-board">
                <h3 className="score">
                    Scores
                </h3>
                <div className="players">
                    <TableContainer>
                        <Table>
                            <TableBody>{this.state.playersList.map(function (item, key) {
                                return (
                                    <TableRow key={key}>
                                        <TableCell style={{ paddingLeft: 40 }}>{item.username}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary">{item.points}</Button>
                                        </TableCell>
                                        <TableCell>
                                            <i className="material-icons">brush</i>
                                        </TableCell>
                                    </TableRow>
                                )
                            }, this)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}
