import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';

export default class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersList: props.playersList,
        };
    }

    render() {
        return (
            <div style={{ padding: 10 }}>
                <h3 style={{ marginTop: 10, backgroundColor: 'lightgray', padding: 8, textAlign: "center" }}>
                    Scores
            </h3>
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
                                        {/* <span class="material-icons">
                                            brush
                                        </span> */}
                                    </TableCell>
                                </TableRow>
                            )
                        }, this)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}