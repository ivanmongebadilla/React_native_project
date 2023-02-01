import { Card } from 'react-native-elements';
import { View, Text, FlatList } from "react-native";

const RenderDays = ({ item }) => {
    console.log("Entering RenderDays")
  return (
    <Card
        title={item.name}
        image={item.image}
    >
        <Text>
            {item.intensity}
        </Text>
    </Card>
  )
}

export default RenderDays;