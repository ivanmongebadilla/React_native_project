import { StyleSheet, View, Text, Modal, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
// import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Button, Icon, Input } from 'react-native-elements';
import { Menu, MenuItem } from 'react-native-material-menu';
import Login from "./Login";
import UserScreen from "../screens/UserScreen";
import { useSelector } from "react-redux";


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
    const [component, setComponent] = useState('');
    const userData = useSelector((state) => state.userLogData)

    return (
        <>
            <Icon 
                name='user'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => {
                    setVisible(!visible)
                }}
            />
            <Modal transparent visible={visible}>
                <TouchableOpacity style={{flex:1}} onPress={() => setVisible(false)}>
                    <TouchableOpacity style={styles.userPopup} activeOpacity={1}>
                        <View>
                            <FlatList 
                                horizontal={false}
                                data={userData.userLogData.success ?  authUser : noUser}
                                ItemSeparatorComponent={ItemSeparatorView}
                                renderItem={ ({item}) => {
                                    return (
                                        <View style={{marginBottom: 5}}>
                                            <Text 
                                                style={styles.userOptions}
                                                onPress={ () => {
                                                    setComponent(item.id)
                                                    setlogModalVisible(!logModalVisible)
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
                    </TouchableOpacity>
                </TouchableOpacity>
                <Modal visible={logModalVisible}>
                    <UserScreen component={component} setVisible={setVisible} setlogModalVisible={setlogModalVisible}  />        
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
    },
    modal: {
        width: 155,
        height: 300
      }
})

export default UserIcon;