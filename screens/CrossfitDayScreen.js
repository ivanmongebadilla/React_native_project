import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Button } from "react-native";
import { WebView } from 'react-native-webview';
import { useState } from "react";
import { useSelector } from "react-redux";

const CrossfitDayScreen = ({ route }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState({});
    const crossfitWorkouts = useSelector((state) => state.crossfitWorkouts)  
    const data = crossfitWorkouts.crossfitWorkoutsArray.filter((crossfitWorkouts) => crossfitWorkouts.day === route.params.item.name)
    
    const renderWorkouts = ({ item }) => { 

        return(
            <View style={styles.workoutView}>
                <Text style={styles.workoutType}>{item.type}</Text>
                { item.workout.map((value, index) => {
                    return (
                        <Text 
                            key={index}
                            style={styles.workoutText}
                            onPress={() => {
                                setSelectedWorkout(value)
                                setShowModal(!showModal) 
                            }}
                        >
                            {value.workout}
                        </Text>
                    )
                })}
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => setShowModal(!showModal)}
                >
                    <View style={{ 
                        flex: 1,
                        backgroundColor: 'orange',
                        borderWidth: 1,
                        borderColor: 'orange',
                        marginTop: 22 }}
                    >
                        <WebView
                            javaScriptEnabled={true}
                            style={{flex:1, borderColor:'red', borderWidth:1, height:400, width:400}}
                            source={{
                                uri: selectedWorkout.link
                            }}
                        />
                    </View>
                    <View>
                        <Button
                            onPress={() => setShowModal(!showModal)}
                            color='#808080'
                            title='Exit'
                        />
                    </View>
                </Modal>
            </View>
        )    
    }

    const ItemDivider = () => {
        return (
          <View
            style={{
              height: 4,
              width: "100%",
              backgroundColor: "#607D8B",
            }}
          />
        );
    }

    return (
        <View>
            <FlatList
               data={data}
               renderItem={renderWorkouts}
               keyExtractor={(item) => item.id.toString()}
               ItemSeparatorComponent={ItemDivider} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    workoutText: {
        textAlign: 'center',
        fontSize: 20,
        margin: 10
    },
    workoutType: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 50,
        marginBottom: 15
    },
    workoutView: {
        marginBottom: 25
    }
})

export default CrossfitDayScreen;