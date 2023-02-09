import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";

const Timer = ({ timer }) => {
    const [time, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);

    function toggle() {
        setIsActive(!isActive);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setTimer(time => time + 1);
          }, 1000);
        } else if (!isActive && time !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
    },[isActive, time])

    if(timer>0) {
        return (
            <View>
                <Text style={styles.textTime}>{time}</Text>
                <Button 
                    title={isActive ? 'Pause' : 'Start'}
                    onPress={() => toggle()}
                />
            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    textTime: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Timer