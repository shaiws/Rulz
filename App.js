import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './HomeScreen'
import { GameDetails } from './GameDetails';
import { AddGame } from './AddGame'


export default function App() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Rulz">
                <Stack.Screen
                    name="Rulz"
                    component={HomeScreen}
                    options={{
                        title: 'Rulz',
                        headerStyle: {
                            backgroundColor: '#2196F3',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        },
                    }} />
                <Stack.Screen
                    name="GameDetails"
                    component={GameDetails}
                    options={{
                        title: "חוקי המשחק",
                        headerStyle: {
                            backgroundColor: '#2196F3',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="AddGame"
                    component={AddGame}
                    options={{
                        title: "הוסף משחק",
                        headerStyle: {
                            backgroundColor: '#2196F3',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
            </Stack.Navigator>
        </ NavigationContainer>
    );
}

