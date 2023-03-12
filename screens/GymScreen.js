import { View, Text, FlatList, Pressable, StyleSheet, ImageBackground } from "react-native";
import { daysData } from '../dummydata/carouselData';
import { Card } from 'react-native-paper';
import { useState } from "react";
import { baseUrl } from "../shared/baseUrl";
import { useSelector } from "react-redux";
import bgImg from '../images/background-img2.jpg'

const GymScreen = ({ navigation }) => {
    const gymDays = useSelector((state) => state.gymDays)
    const userData = useSelector((state) => state.userLogData)

    const RenderDays = ({ item }) => {
        return (
          <View style={styles.viewStyle}>
            <Card style={styles.cardStyle}
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

    if (!userData.logged) {
      return (
        <View>
          <ImageBackground
            source={bgImg}
            resizeMode="cover"
            style={styles.bgImage}
          >
            <Text style={styles.cardTitle}>Please Log In to access the data</Text>
          </ImageBackground>
        </View>
      )
    } else {
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
      } else {
        return null
      }
    }

    // if (gymDays.isLoading === false) {
    //     return (
    //       <View>
    //         <ImageBackground
    //           source={bgImg}
    //           resizeMode="cover"
    //           style={styles.bgImage}
    //         >
    //           <FlatList 
    //             horizontal={false}
    //             numColumns={2}
    //             data={gymDays.gymDaysArray}
    //             renderItem={RenderDays}
    //             keyExtractor={(item) => item.id.toString()}
    //           />
    //         </ImageBackground> 
    //       </View>
    //     );
    // }
}

const styles = StyleSheet.create({
  viewStyle: {
    width: '50%',
    borderRadius: 5
  },
  cardStyle: {
    borderRadius: 13, 
    width: 170, 
    margin: 13, 
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  card: {
    borderRadius: 8
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  cardIntensity: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontStyle: 'italic'
  },
  bgImage: {
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }
})

export default GymScreen;