import { View, Text, FlatList, Pressable, StyleSheet, ImageBackground } from "react-native";
import { daysData } from '../dummydata/carouselData';
import { Card } from 'react-native-paper';
import { useState } from "react";
import { baseUrl } from "../shared/baseUrl";
import { useSelector } from "react-redux";
import bgImg from '../images/background-img2.jpg'

const GymScreen = ({ navigation }) => {
    const gymDays = useSelector((state) => state.gymDays)

    const RenderDays = ({ item }) => {
        return (
          <View style={styles.cardStyle}>
            <Card style={{borderRadius: 15, width: 170, margin: 13, backgroundColor: 'black'}}
              onPress={() => navigation.navigate("gymDayWorkOut", { item })}
            >
              <Card.Title title={item.name} subtitle={item.intensity} titleStyle={styles.cardTitle} subtitleStyle={styles.cardIntensity}/>
              <Card.Cover
                source={{ uri: baseUrl + item.image }}
                style={{margin: 5}}
              />
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
    fontSize: 20,
    textAlign: 'center'
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