import { View, Text, FlatList } from "react-native";
import { daysData } from '../dummydata/carouselData';
import { Card } from 'react-native-elements';

const CrossfitScreen = () => {
  
  const RenderDays = ({ item }) => {
    console.log("Entering RenderDays")
    return (
      <Card>
        <Card.Title>
          <Text>
            {item.name}
          </Text>
        </Card.Title>
        <Card.Image
          source={item.image}
        />
        <Text>
            {item.intensity}
        </Text>
      </Card>
    )
  }

  return (
    <View>
      <FlatList 
        horizontal={false}
        numColumns={2}
        data={daysData}
        renderItem={RenderDays}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default CrossfitScreen;