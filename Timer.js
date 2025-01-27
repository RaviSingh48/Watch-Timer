import React, { useState, useEffect } from 'react';

function Timer() {
    const [workTime, setWorkTime] = useState(25); 
    const [breakTime, setBreakTime] = useState(5); 
    const [wS, setwS] = useState(25 * 60); 
    const [isRunning, setIsRunning] = useState(false); 
    const [isStopped, setIsStopped] = useState(false); 

    const time = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    const startTimer = () => {
        setIsRunning(true);
        setIsStopped(false);
    };

    
    const stopTimer = () => {
        setIsRunning(false);
        setIsStopped(true);
    };

    
    const resetTimer = () => {
        setIsRunning(false);
        setIsStopped(false);
        setwS(Math.round(workTime * 60));
    };

    
    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setwS((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(timer);
                        return 0;
                    }
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1>{time(wS)}</h1>
            <h2>Work-Time</h2>
            <button onClick={startTimer} disabled={isRunning || isStopped}>
                Start
            </button>
            <button onClick={stopTimer} disabled={!isRunning}>
                Stop
            </button>
            <button onClick={resetTimer} disabled={isRunning || !isStopped}>
                Reset
            </button>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setwS(Math.round(workTime * 60)); 
                }}
                style={{ marginTop: '20px' }}
            >
                <input
                    type="number"
                    placeholder="Enter Work-Time (min)"
                    step="0.1" 
                    onChange={(e) => setWorkTime(parseFloat(e.target.value))}
                    style={{ padding: '10px', marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Enter Break-Time (min)"
                    step="0.1" 
                    onChange={(e) => setBreakTime(parseFloat(e.target.value))}
                    style={{ padding: '10px', marginRight: '10px' }}
                />
                <input
                    type="submit"
                    value="Set"
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                />
            </form>
        </div>
    );
}

export default Timer;
