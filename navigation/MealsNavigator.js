import React from 'react';
import { Platform, Text } from 'react-native';
// provides all the meta data for react navigation to access throughout the app
import { createAppContainer } from 'react-navigation';
// screens act as pages in a stack
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavigatorOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold'
	},
	// customize the style of the back button
	headerBackTitleStyle: {
		fontFamily: 'open-sans'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
	headerTitle: 'Header Title'
}

// create a stack of screens to be navigated between
const MealsNavigator = createStackNavigator({
	// assign a name for the screen that will be displayed, this key will be used
	// as the default title of the screen displayed in the header
	// specify which component should be loaded at this state
	// first example is simplest form
	Categories: {
		screen: CategoriesScreen
	},
	// alternatively create an object which allows for applying
	// additional attributes
	CategoryMeals: {
		screen: CategoryMealsScreen
	},
	MealDetails: MealDetailsScreen
}, {
	// configure default navigation options
	// will auto merge with any options specified in individual screens
	// with the individual options overriding these defaults
	defaultNavigationOptions: defaultStackNavigatorOptions
	// tell the navigation to present the screens in a modal style
	// mode: 'modal'
	// change the initial route name/specify manually which screen to start with
	// initialRouteName: 'MealsScreen'
});

const FavoritesNavigator = createStackNavigator({
	Favorites: FavoritesScreen,
	MealDetails: MealDetailsScreen
}, {
	defaultNavigationOptions: defaultStackNavigatorOptions
});

const tabScreenConfig = {
	// can be a specific screen, or a stack navigator
	// add icons by specifying navigationOptions here or within the createStackNavigator as another key value pair
	// only needs to be here if navigator is used inside of another navigator
	Meals: {
		screen: MealsNavigator, navigationOptions: {
			// tabInfo refers to the values provided in tabBarOptions below
			tabBarIcon: (tabInfo) => {
				return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
			},
			// tabBarColor only applies when shifting is set to true
			tabBarColor: Colors.primaryColor,
			// android way of styling the navigator icons
			tabBarLabel: Platform.OS === 'android' ? 
				<Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text> : 'Meals'
		}
	},
	Favorites: {
		screen: FavoritesNavigator, navigationOptions: {
			// the key "Favorites" will be used in the UI by default
			// tabBarLabel allows for overriding that
			// tabBarLabel: 'Something else',
			tabBarIcon: (tabInfo) => {
				return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel: Platform.OS === 'android' ?
				<Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text> : 'Favorites'
		}
	}
};

// requires config settings object to initialize
const MealsFavoritesTabNavigator = Platform.OS === 'android' ? 
	createMaterialBottomTabNavigator(tabScreenConfig, {
		activeTintColor: 'white',
		// shifting makes the tab grow and add the title when its active
		// inactive is smaller with no title
		shifting: true
		// if shifting is false, barStyle can be used to customize the style
		// , barStyle: {
		// 	backgroundColor: Colors.primaryColor
		// }
	}) : 
	createBottomTabNavigator(tabScreenConfig, {
		// config the tab settings, such as style
		tabBarOptions: {
			labelStyle: {
				fontFamily: 'open-sans-bold'
			},
			activeTintColor: Colors.accentColor
		}
	}
);

const FiltersNavigator = createStackNavigator({
	Filters: FiltersScreen
}, {
	navigationOptions: {
		// optionally create custom label to display in drawer
		// drawerLabel: 'Filters'
	},
	defaultNavigationOptions: defaultStackNavigatorOptions
});

const MainNavigator = createDrawerNavigator({
	MealsFavorites: MealsFavoritesTabNavigator,
	Filters: FiltersNavigator
}, {
	// customize the style of drawer items
	contentOptions: {
		activeTintColor: Colors.accentColor,
		labelStyle: {
			fontFamily: 'open-sans-bold'
		}
	}
});

// mealsNavigator gets replaced with tabs navigator since meals nav is nested
// within the tab navigator already
export default createAppContainer(MainNavigator);