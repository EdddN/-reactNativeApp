import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/Home';
import BookMarkScreen from './screens/Bookmark';
import SinglePost from './screens/SinglePost';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createStackNavigator()

function HomeStack({ navigation })  {
    return (
        <Stack.Navigator
>

            <Stack.Screen
                name=" "
                component={HomeScreen}
            />
            <Stack.Screen
                name="SinglePost"
                component={SinglePost}
            />
        </Stack.Navigator>
    );
}
function BookMarkStack({ navigation }) {
    return (
        <Stack.Navigator
  screenOptions={{
    headerShown: false
  }}
>

            <Stack.Screen name=" " component={BookMarkScreen} />
            <Stack.Screen name="SinglePost" component={SinglePost} />
        </Stack.Navigator>
    );
}

const  Navigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer
        >
            <Tab.Navigator screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Bookmark') {
                        iconName = focused ? 'bookmark' : 'bookmark-outline';
                    }
                    return (
                        <MaterialCommunityIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
                screenOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>
                <Tab.Screen name="Home" component={HomeStack} />                
                <Tab.Screen name="Bookmark" component={BookMarkStack} />                
            </Tab.Navigator>
        </NavigationContainer>
    );
} 

export default Navigator;