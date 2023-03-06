import { StyleSheet, View, Text, Modal, SafeAreaView, FlatList } from "react-native";
import { useState } from "react";
// import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Icon } from 'react-native-elements';
import { Menu, MenuItem } from 'react-native-material-menu';

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

    return (
        <>
            <Icon 
                name='user'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => setVisible(!visible)}
            />
            <Modal transparent visible={visible}>
                <SafeAreaView style={{flex:1}} onTouchStart={ () => setVisible(false)}>
                    <View style={styles.userPopup}>
                        <FlatList 
                            horizontal={false}
                            data={authUser}
                            ItemSeparatorComponent={ItemSeparatorView}
                            renderItem={ ({item}) => {
                                return (
                                    <View style={{marginBottom: 5}}>
                                        <Text style={styles.userOptions}>{item.value}</Text>
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item.id}
                        />
                        {/* <Text style={styles.userOptions}>Sign Up</Text>
                        <Text style={styles.userOptions}>--------</Text>
                        <Text style={styles.userOptions}>Log In</Text>
                        <Text style={styles.userOptions}>--------</Text>
                        <Text style={styles.userOptions}>Log Out</Text>
                        <Text style={styles.userOptions}>--------</Text>
                        <Text style={styles.userOptions}>Profile</Text> */}
                    </View>
                </SafeAreaView>
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