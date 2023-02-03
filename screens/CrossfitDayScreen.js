import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

const CrossfitDayScreen = ({ route }) => {
    const crossfitWorkouts = useSelector((state) => state.crossfitWorkouts)  
    const data = crossfitWorkouts.crossfitWorkoutsArray.filter((crossfitWorkouts) => crossfitWorkouts.day === route.params.item.name)
    
    const renderWorkouts = ({ item }) => {         
        return(
            <View>
                <Text>{item.type}</Text>
                { item.workout.map((value, index) => {
                    return <Text key={index}>{value.workout}</Text>
                })}
                <Text>{item.workout.workout}</Text>
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

export default CrossfitDayScreen;