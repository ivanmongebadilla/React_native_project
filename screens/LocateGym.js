import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ListItem } from "react-native-elements";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { GOOGLE_API_KEY } from '../environments';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchNearestPlaces } from '../reducers/nearestPlacesSlice';

const LocateGym = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const nearData = useSelector((state) => state.nearestPlaces) 
    const dispatch = useDispatch();
    
    const renderNearLocations = ({ item }) => {
        return (
            <View style={{margin: 5}}>
                <ListItem
                containerStyle={{backgroundColor: 'rgba(52, 52, 52, 0.5)', borderRadius: 10}}
                >
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.vicinity}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        )
    }

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location)

          dispatch(fetchNearestPlaces({latitude: location.coords.latitude, longitude: location.coords.longitude}))

        })();
      }, []);
    
      let text = 'Waiting..';
      if (errorMsg) {
        //text = errorMsg;
        console.log(errorMsg)
      } 
    //   else if (location) {
    //     //text = JSON.stringify(location);
    //     console.log('This is location: ', location)
    //   }


    if (nearData.isLoading) {
        return (
            <View>
                <Text>Please wait...</Text>
            </View>
        )
    }
    else {
        console.log('This is data.array: ', nearData.nearestPlacesArray)
        return (
            <FlatList 
                data={nearData.nearestPlacesArray}
                renderItem={renderNearLocations}
                keyExtractor={(item) => item.place_id}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    viewContainer: {
        backgroundColor: 'blue',
        borderColor: 'black'
    },
    input: {
        borderColor: '#888'
    }
  });

export default LocateGym