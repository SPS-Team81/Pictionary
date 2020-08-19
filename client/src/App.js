import React from 'react';
import Game from './components/Game';
import Join from './components/Join';
import { _roomName } from './api'

function App() {
    if (_roomName === "") {
        return (
            <Join />
        )
    } else {
        return (
            <Game />
        );
    }
}

export default App;