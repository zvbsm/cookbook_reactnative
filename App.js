import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
// provider must be wrapped around the root component of the app
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';

// call useScreens after imports and before any other code is ran to initialize
// old version
// useScreens();
// new version
enableScreens();

// when having multiple reducers, they must be merged into 1 since createStore
// requires 1 master reducer.
const rootReducer = combineReducers({
  // meals would be a 'slice' referred to in CategoryMealsScreen imports
  // mealsReducer would be the meals.js object defined in store/reducers/meals.js
  meals: mealsReducer
  // otherReducers: ...
});
const store = createStore(rootReducer);

const getFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={getFonts} onFinish={() => setFontLoaded(true) }/>
  };

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
