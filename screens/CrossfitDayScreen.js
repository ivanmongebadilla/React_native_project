import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const CrossfitDayScreen = ({ route }) => {
    const crossfitWorkouts = useSelector((state) => state.crossfitWorkouts)
    const { name } = route.params;
    console.log(route.params.item.name);

    return (
        <View>
            <Text>Day workout</Text>
        </View>
    )
}

export default CrossfitDayScreen;