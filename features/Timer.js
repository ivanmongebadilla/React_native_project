import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";

const Timer = ({ timer }) => {
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [isActive, setIsActive] = useState(false);

    function toggle() {
        setIsActive(!isActive);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
        interval = setInterval(() => {
            setSec(sec => {
            if (sec === 59){
                setMin(min => min +1)
                return 0
            } else {
                return (sec + 1)
            }
            });
        }, 1000);
        } else if (!isActive && sec !== 0) {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    },[isActive, sec])

    if(timer>0) {
        return (
            <View>
                <Text style={styles.textTime}>{min.toString()}:{sec.toString() < 10 ? '0'+sec.toString() : sec.toString()}</Text>
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
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Timer