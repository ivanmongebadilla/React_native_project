import { View, Text, FlatList, Pressable } from "react-native";
import { daysData } from '../dummydata/carouselData';
import { Card } from 'react-native-elements';
import { useState } from "react";
import { baseUrl } from "../shared/baseUrl";
import { useSelector } from "react-redux";

const CrossfitScreen = ({ navigation }) => {

  const crossfitDays = useSelector((state) => state.crossfitDays)
  console.log(crossfitDays.isLoading)
  
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
          source={{ uri: baseUrl + item.image }}
          onPress={() => navigation.navigate("DayWorkOut", { item })}
        />
        <Text>
            {item.intensity}
        </Text>
      </Card>
    )
  }

  if (crossfitDays.isLoading === false) {
    return (
      <View>
        <FlatList 
          horizontal={false}
          numColumns={2}
          data={crossfitDays.crossfitDaysArray}
          renderItem={RenderDays}
          keyExtractor={(item) => item.id.toString()}
        /> 
      </View>
    );
  }
}

export default CrossfitScreen;