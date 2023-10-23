import React, { StrictMode } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActorDetails, AllShows, Homepage, MovieDetails, Search, TvDetails } from './screens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <StrictMode>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <Stack.Navigator>
            <Stack.Screen name='Home' options={{ headerShown: false }} component={Homepage} />
            <Stack.Screen
              name='MovieDetails'
              options={{ headerShown: false }}
              component={MovieDetails}
            />
            <Stack.Screen
              name='ActorDetails'
              options={{ headerShown: false }}
              component={ActorDetails}
            />
            <Stack.Screen name='TvDetails' options={{ headerShown: false }} component={TvDetails} />
            <Stack.Screen name='Search' options={{ headerShown: false }} component={Search} />
            <Stack.Screen name='AllShows' options={{ headerShown: false }} component={AllShows} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </StrictMode>
  );
}
