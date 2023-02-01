import { View, Text, FlatList } from "react-native";
import { daysData } from '../dummydata/carouselData';
import { Card } from 'react-native-elements';

const CrossfitScreen = () => {
  
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

  return (
    <View>
      <Text>CrossfitScreen</Text>
      <FlatList 
        data={daysData}
        renderItem={RenderDays}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default CrossfitScreen;