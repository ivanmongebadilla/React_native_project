import React from 'react';
import { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { fetchSingUpData } from '../reducers/userSlice';
import { fetchLogInData } from '../reducers/userSlice';
import { useDispatch } from "react-redux";

const UserScreen = ({ component, setVisible, setlogModalVisible }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const userCredentials = {...{username}, ...{password}}
    
    const dispatch = useDispatch();

    if (component === '1'){
        return (
            <SafeAreaView>
                <View style={{alignItems:'center', marginTop: 80}}>
                    <Text style={{margin:30, fontSize:18, alignItems:'center', justifyContent:'center'}}>Create Username and Password</Text>
                    <Input 
                        placeholder='Username'
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                    />
                    <Input 
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>
                <View>
                    <Button 
                        onPress={() => {
                            dispatch(fetchSingUpData(userCredentials))
                            Alert.alert(
                                'Sign In',
                                'You have created your account please log in!',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            setlogModalVisible(false)
                                            setVisible(false)
                                        }
                                    }
                                ]
                            )
                        }}
                        title='Sign Up'
                        color='#5637DD'
                        buttonStyle={{margin:10}}
                    />
                    <Button 
                        onPress={() => {
                            setlogModalVisible(false)
                            setVisible(false)
                        }}
                        title='Cancel'
                        color='#5637DD'
                        buttonStyle={{margin:10}}
                    />
                </View>
            </SafeAreaView>
        )
    } else if (component === '2') {
        return (
            <SafeAreaView>
                <View style={{alignItems:'center', marginTop: 80}}>
                    <Text style={{margin:30, fontSize:18, alignItems:'center', justifyContent:'center'}}>Use your credentials to login</Text>
                    <Input 
                        placeholder='Username'
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                    />
                    <Input 
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>
                <View>
                    <Button 
                        onPress={() => {
                            dispatch(fetchLogInData(userCredentials))
                                .then((userData) => {
                                    const isUserLoggedIn = userData.payload.success
                                    if (isUserLoggedIn) {
                                        Alert.alert(
                                            'Logged In',
                                            'You are successfully logged in!',
                                            [
                                                {
                                                    text: 'OK',
                                                    onPress: () => {
                                                        setlogModalVisible(false)
                                                        setVisible(false)
                                                    }
                                                }
                                            ]
                                        )
                                    } else {
                                        Alert.alert(
                                            'Logged In',
                                            'Try Again!',
                                            [
                                                {
                                                    text: 'OK'
                                                }
                                            ]
                                        )
                                    }
                                })
                        }}
                        title='LogIn'
                        color='#5637DD'
                        buttonStyle={{margin:10}}
                    />
                    <Button 
                        onPress={() => {
                            setlogModalVisible(false)
                            setVisible(false)
                        }}
                        title='Cancel'
                        color='#5637DD'
                        buttonStyle={{margin:10}}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({ 
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    }
})

export default UserScreen;