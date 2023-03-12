import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import { StyleSheet, View, Button, Text } from "react-native";
import { Icon } from 'react-native-elements';
import CrossfitScreen from "./CrossfitScreen";
import GymScreen from "./GymScreen";
import { useDispatch } from "react-redux";
import { fetchNews } from "../reducers/newsSlice";
import { fetchcrossfitDays } from '../reducers/crossfitDaysSlice';
import { fetchcrossfitWorkouts } from "../reducers/crossfitWorkoutsSlice";
import { useEffect } from "react";
import CrossfitDayScreen from "./CrossfitDayScreen";
import { fetchgymDays } from "../reducers/gymDaysSlice";
import { fetchgymWorkouts } from "../reducers/gymWorkoutsSlice";
import GymDayScreen from './GymDayScreen';
import UserIcon from "../features/UserIcon";

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
                        name='bars'
                        type='font-awesome'
                        iconStyle={styles.stackIcon}
                        onPress={() => navigation.toggleDrawer()}
                      />
                    ),
                    headerRight: () => (
                        <UserIcon />
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
                            name='fire'
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
                options={({ route }) => ({
                    title: route.params.item.name,
                    headerRight: () => (
                        <Button
                            title='Add'
                        />
                    )
                })}
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
                       name='bomb'
                       type='font-awesome'
                       iconStyle={styles.stackIcon}
                       onPress={() => navigation.toggleDrawer()}
                     />
                   )
                })}
            />
            <Stack.Screen 
                name="gymDayWorkOut"
                component={GymDayScreen}
                options={({ route }) => ({
                    title: route.params.item.name,
                    headerRight: () => (
                        <Button
                            title='Add'
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
        dispatch(fetchcrossfitWorkouts())
        dispatch(fetchgymDays())
        dispatch(fetchgymWorkouts())
    })

  return (
    <View style={{ flex: 1 }}>
        <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle={{ backgroundColor: "#F2F3F4" }}
            drawerPosition="left"
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
                            name='fire'
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
                            name='bomb'
                            type='font-awesome'
                            iconStyle={{ width: 24 }}
                            color={color}
                        />
                    ) 
                }}
            />
            <Drawer.Screen
                name="Contact"
                component={GymNavigator}
                options={{ title: "Contact Us",
                    drawerIcon: ({ color }) => (
                        <Icon 
                            name='id-card'
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
        margin: 10,
        color: '#fff',
        fontSize: 24
    },
    navigationText: {
        color: '#fff'
    },
  });

export default MainComponent