import { StyleSheet, View, Text, Modal, SafeAreaView, FlatList } from "react-native";
import { useState } from "react";
// import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Button, Icon, Input } from 'react-native-elements';
import { Menu, MenuItem } from 'react-native-material-menu';
import Login from "./Login";

const authUser = [
    { id: '1', value: 'Profile' },
    { id: '2', value: 'Log Out' }
]
const noUser = [
    { id: '1', value: 'Sign Up' },
    { id: '2', value: 'Log In' }
]

const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 2, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

const UserIcon = () => {
    const [visible, setVisible] = useState(false);
    const [logModalVisible, setlogModalVisible] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <Icon 
                name='user'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => {
                    setVisible(!visible)
                    console.log(visible)
                }}
            />
            <Modal transparent visible={visible}>
                <SafeAreaView style={{flex:1,}} onTouchStart={ () => setVisible(false)}>
                    <View style={styles.userPopup}>
                        <FlatList 
                            horizontal={false}
                            data={noUser}
                            ItemSeparatorComponent={ItemSeparatorView}
                            renderItem={ ({item}) => {
                                return (
                                    <View style={{marginBottom: 5}}>
                                        <Text 
                                            style={styles.userOptions}
                                            onPress={ () => {
                                                setlogModalVisible(!logModalVisible)
                                                console.log(logModalVisible)
                                            }}
                                        >
                                            {item.value}
                                        </Text>
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </SafeAreaView>
                <Modal visible={logModalVisible}>
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
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    stackIcon: {
        margin: 10,
        color: '#fff',
        fontSize: 24
    },
    menuOption: {
        marginRight: 30,
    },
    userPopup: {
        borderRadius: 8,
        borderColor: '#333',
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        position: 'absolute',
        top: 40,
        right: 0,
        alignItems: 'center',
        width: 150
    },
    userOptions: {
        fontSize: 25,
        alignContent: 'center',
        fontWeight: 'bold'
    }
})

export default UserIcon;