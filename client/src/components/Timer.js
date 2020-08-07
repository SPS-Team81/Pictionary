import React from 'react';

function Timer() {
    return (
        <div style={{ padding: 10 }}>
            <h3 style={{ marginTop: 10, backgroundColor: 'lightgray', padding: 8, textAlign: "center" }}>
                Time Remaining
            </h3>
            <div>
                <div style={{ float: "none", margin: "auto", padding: 10, backgroundColor: "red", borderRadius: "50%", width: 250, height: 250 }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", margin: 0, fontSize: 50 }}>Time</div>
                </div>
            </div>
        </div>
    );
}

export default Timer;