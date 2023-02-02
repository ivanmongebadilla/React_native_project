import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import { StyleSheet, View } from "react-native";
import { Icon } from 'react-native-elements';
import CrossfitScreen from "./CrossfitScreen";
import GymScreen from "./GymScreen";
import { useDispatch } from "react-redux";
import { fetchNews } from "../reducers/newsSlice";
import { fetchcrossfitDays } from '../reducers/crossfitDaysSlice';
import { useEffect } from "react";
import CrossfitDayScreen from "./CrossfitDayScreen";


const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: "#fff",
    headerStyle: { backgroundColor: "#09143C" },
  };

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerLeft: () => (
                      <Icon 
                        name='home'
                        type='font-awesome'
                        iconStyle={styles.stackIcon}
                        onPress={() => navigation.toggleDrawer()}
                      />
                    )
                })}
            />
        </Stack.Navigator>
    )
}

const CrossfitNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Crossfit" 
            screenOptions={screenOptions}
        >
            <Stack.Screen 
                name="Crossfit" 
                component={CrossfitScreen} 
                options={({ navigation }) => ({
                    headerLeft: () => (
                     <Icon 
                       name='heart'
                       type='font-awesome'
                       iconStyle={styles.stackIcon}
                       onPress={() => navigation.toggleDrawer()}
                     />
                   )
                })}
            />
            <Stack.Screen 
                name="DayWorkOut"
                component={CrossfitDayScreen}
            />
        </Stack.Navigator>
    )
}

const GymNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Gym" 
            screenOptions={screenOptions}
        >
            <Stack.Screen 
                name="Gym" 
                component={GymScreen} 
                options={({ navigation }) => ({
                    headerLeft: () => (
                     <Icon 
                       name='heart'
                       type='font-awesome'
                       iconStyle={styles.stackIcon}
                       onPress={() => navigation.toggleDrawer()}
                     />
                   )
                })}
            />
        </Stack.Navigator>
    )
}


const MainComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNews())
        dispatch(fetchcrossfitDays())
    })

  return (
    <View style={{ flex: 1 }}>
        <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle={{ backgroundColor: "#273F4B" }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeNavigator}
                options={{ title: "Home",
                    drawerIcon: ({ color }) => (
                        <Icon 
                            name='home'
                            type='font-awesome'
                            iconStyle={{ width: 24 }}
                            color={color}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Crossfit"
                component={CrossfitNavigator}
                options={{ title: "Crossfit Training",
                    drawerIcon: ({ color }) => (
                        <Icon 
                            name='heart'
                            type='font-awesome'
                            iconStyle={{ width: 24 }}
                            color={color}
                        />
                    ) 
                }}
            />
            <Drawer.Screen
                name="Gym"
                component={GymNavigator}
                options={{ title: "Gym Training",
                    drawerIcon: ({ color }) => (
                        <Icon 
                            name='heart'
                            type='font-awesome'
                            iconStyle={{ width: 24 }}
                            color={color}
                        />
                    ) 
                }}
            />
        </Drawer.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    },
    navigationText: {
        color: '#fff'
    },
  });

export default MainComponent