import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview';
import { useState } from "react";
import { useSelector } from "react-redux";

const CrossfitDayScreen = ({ route }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState({});
    const crossfitWorkouts = useSelector((state) => state.crossfitWorkouts)  
    const data = crossfitWorkouts.crossfitWorkoutsArray.filter((crossfitWorkouts) => crossfitWorkouts.day === route.params.item.name)

    // const renderModal = (value) => {
    //     console.log(value.link)
    //     return (
    //         <Modal
    //             animationType='slide'
    //             transparent={false}
    //             visible={showModal}
    //             onRequestClose={() => setShowModal(!showModal)}
    //         >
    //             <View style={{ 
    //                 flex: 1,
    //                 backgroundColor: 'orange',
    //                 borderWidth: 1,
    //                 borderColor: 'orange',
    //                 marginTop: 22 }}
    //             >
    //                 <Text>{value.link}</Text>
    //                 <WebView
    //                     javaScriptEnabled={true}
    //                     style={{flex:1, borderColor:'red', borderWidth:1, height:400, width:400}}
    //                     source={{
    //                         uri: 'https://www.youtube.com/embed/RJa4kG1N3d0'
    //                     }}
    //                 />
    //                 <TouchableOpacity onPress={() => setShowModal(!showModal)}>
    //                     <Text>Hide Modal</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </Modal>
    //     )
    // }
    
    const renderWorkouts = ({ item }) => { 

        return(
            <View>
                <Text>{item.type}</Text>
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
                        <Text>{selectedWorkout.link}</Text>
                        <WebView
                            javaScriptEnabled={true}
                            style={{flex:1, borderColor:'red', borderWidth:1, height:400, width:400}}
                            source={{
                                uri: 'https://www.youtube.com/embed/RJa4kG1N3d0'
                            }}
                        />
                        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                            <Text>Hide Modal</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )    
    }

    return (
        <View>
            <FlatList
               data={data}
               renderItem={renderWorkouts}
               keyExtractor={(item) => item.id.toString()} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    workoutText: {
        textAlign: 'center',
        fontSize: 15
    }
})

export default CrossfitDayScreen;