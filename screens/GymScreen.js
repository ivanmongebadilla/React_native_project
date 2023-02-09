import { View, Text, FlatList, Pressable, StyleSheet, ImageBackground } from "react-native";
import { daysData } from '../dummydata/carouselData';
import { Card } from 'react-native-elements';
import { useState } from "react";
import { baseUrl } from "../shared/baseUrl";
import { useSelector } from "react-redux";
import bgImg from '../images/background-img2.jpg'

const GymScreen = ({ navigation }) => {
    const gymDays = useSelector((state) => state.gymDays)

    const RenderDays = ({ item }) => {
        return (
            <View style={{ borderWidth: 1, borderColor: "grey"}}>
              <Card style={styles.card}>
                <Card.Title>
                <Text style={styles.cardTitle}>
                    {item.name}
                </Text>
                </Card.Title>
                <Card.Image
                source={{ uri: baseUrl + item.image }}
                onPress={() => navigation.navigate("gymDayWorkOut", { item })}
                />
                <Text style={styles.cardIntensity}>
                    {item.intensity}
                </Text>
              </Card>
            </View>
        )
    }

    if (gymDays.isLoading === false) {
        return (
          <View>
            <ImageBackground
              source={bgImg}
              resizeMode="cover"
              style={styles.bgImage}
            >
              <FlatList 
                horizontal={false}
                numColumns={2}
                data={gymDays.gymDaysArray}
                renderItem={RenderDays}
                keyExtractor={(item) => item.id.toString()}
              />
            </ImageBackground> 
          </View>
        );
    }
}

const styles = StyleSheet.create({
  cardStyle: {
    width: '50%',
    borderRadius: 5
  },
  card: {
    borderRadius: 8
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  cardIntensity: {
    textAlign: 'center',
    fontStyle: 'italic'
  },
  bgImage: {
    justifyContent: 'center',
  }
})

export default GymScreen;