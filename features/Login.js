import { StyleSheet, View, Text, Modal, SafeAreaView, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Input } from "react-native-elements";


const Login = ({ visible }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    console.log('Entering log in component')

  return (
    <Modal visible={visible}>
       <SafeAreaView>
            <View>
                <Input 
                    placeholder='Username'
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <Input 
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            </View>
            <View>
                <Button 
                    onPress={() => setlogModalVisible(false)}
                    title='LogIn'
                    color='#5637DD'
                />
                <Button 
                    onPress={() => setlogModalVisible(false)}
                    title='Cancel'
                    color='#5637DD'
                />
            </View>
        </SafeAreaView>         
    </Modal>
  )
}

export default Login;