import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

function ScoreBoard() {
    return (
        <div style={{ padding: 10 }}>
            <h3 style={{ marginTop: 10, backgroundColor: 'lightgray', padding: 8, textAlign: "center" }}>
                Scores
            </h3>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Player</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Player</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Player</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ScoreBoard;