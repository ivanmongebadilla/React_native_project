import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../environments';
import { useDispatch } from "react-redux";

const fetchNearestPlaces = (latitude, longitude ) => {
    let radMetter = 4 * 1000;
    console.log('Props for fetch: ' + latitude + longitude)
    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=4500&type=restaurant&key=' + GOOGLE_API_KEY)
        .then(response => response.json())
        .then(data => console.log(data.results));
}

const LocateGym = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [pin, setPin] = useState({})
    const dispatch = useDispatch();
    
    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          setPin({ latitude: location.coords.latitude, longitude: location.coords.longitude, 
        latitudeDelta: 0.030, longitudeDelta: 0.030})
        console.log('props before fetch: ' + location.coords.latitude, location.coords.longitude)
        fetchNearestPlaces(location.coords.latitude, location.coords.longitude)
        // fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + location.coords.latitude + ',' + location.coords.longitude + '&radius=4500&type=restaurant&key=' + GOOGLE_API_KEY)
        //     .then(response => response.json())
        //     .then(data => console.log('This is data: ', data.results)); 
        })();
      }, []);
    
      let text = 'Waiting..';
      if (errorMsg) {
        //text = errorMsg;
        console.log(errorMsg)
      } else if (location) {
        //text = JSON.stringify(location);
        console.log('This is location: ', location)
      }


    return (
        <View style={styles.container}>
          <MapView 
            style={styles.map} 
            provider={PROVIDER_GOOGLE} 
            showsUserLocation={true}
            region={pin}
            //initialRegion={pin}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    searchContainer: {
        position: 'absolute',
        width: '90%',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        padding: 8,
        borderRadius: 8
    },
    input: {
        borderColor: '#888'
    }
  });

export default LocateGym