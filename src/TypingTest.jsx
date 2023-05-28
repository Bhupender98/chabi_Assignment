import React, { useState, useEffect } from 'react';

const keysWillPress = 'asdfjkl;';

function TypingTest() {
    const [input, setInput] = useState('');
    const [nextKey, setNextKey] = useState(keysWillPress[0]);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [totalKeysPressed, setTotalKeysPressed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    useEffect(() => {
        setStartTime(Date.now());
        // Clean up function
        return () => {
            setEndTime(Date.now());
            calculateStatistics();
        };
    }, [input]);

    const handleKeyPress = (event) => {
        console.log("events", event.key);
        const { key } = event;
        console.log(input.length)
        if (key === nextKey) {
            calculateStatistics();
            setInput(input + key);
            setNextKey(keysWillPress[input.length + 1]);
            setTotalKeysPressed(totalKeysPressed + 1);
        } else if (key === 'Backspace') {
            setInput(input.slice(0, -1));
            setTotalKeysPressed(totalKeysPressed + 1);
        }
    };
    const calculateStatistics = () => {
        if (!input.length) {
            setAccuracy(0);
        } else {
            setAccuracy((input.length / totalKeysPressed) * 100);
        }
    };

    return (
        <div className="container">
            <h1>Touch Typing Practice</h1>
            <p>Press the keys: {keysWillPress}</p>
            <p>Next key: {nextKey}</p>
            <textarea
                autoFocus
                value={input}
                onKeyDown={handleKeyPress}
                style={{ width: '300px', height: '100px' }}
            />

            <h4>Total Number of keys pressed: {totalKeysPressed}</h4>
            <h4>Accuracy: {accuracy}</h4>
        </div>
    );
}

export default TypingTest;
