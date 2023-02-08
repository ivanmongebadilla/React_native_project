import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Button, ImageBackground } from "react-native";
import { WebView } from 'react-native-webview';
import { useState } from "react";
import { useSelector } from "react-redux";
import bgImg from '../images/background-img2.jpg'

const GymDayScreen = ({ route }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState({});
    const gymWorkouts = useSelector((state) => state.gymWorkouts)  
    const data = gymWorkouts.gymWorkoutsArray.filter((gymWorkouts) => gymWorkouts.day === route.params.item.name)

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
        <ImageBackground
            source={bgImg}
            resizeMode="cover"
            style={styles.bgImage}
        >
            <FlatList
            data={data}
            renderItem={renderWorkouts}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={ItemDivider} 
            />
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    workoutText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        margin: 10,
        color: '#FFFFFF'
    },
    workoutType: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 50,
        marginBottom: 15,
        color: '#FFFFFF'
    },
    workoutView: {
        marginBottom: 25
    },
    bgImage: {
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    }
})

export default GymDayScreen;