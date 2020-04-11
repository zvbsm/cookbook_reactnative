import React from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummyData';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = props => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	)
};

const MealDetailsScreen = props => {
	const mealId = props.navigation.getParam('mealId');
	const selectedMeal = MEALS.find(meal => meal.id === mealId);

	return (
		<ScrollView>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={{ ...styles.details }}>
				<DefaultText>{selectedMeal.duration}m</DefaultText>
				<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{/* ingredients are a list, can map() to a list of components 
				must specify a key which can be an id or the item itself */}
			{selectedMeal.ingredients.map(ingredient => (
				// the content of this list item gets accessed by ListItem component
				// as props.children
				<ListItem key={ingredient}>{ingredient}</ListItem>
			))}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal.steps.map(step => (
				<ListItem key={step}>{step}</ListItem>
			))}
		</ScrollView>
	)
};

// load data dynamically to the MealDetailsScreen by running the navigationData method
// thats provided by the navigation component by default
MealDetailsScreen.navigationOptions = (navigationData) => {
	const mealId = navigationData.navigation.getParam('mealId');
	const selectedMeal = MEALS.find(meal => meal.id === mealId);

	return {
		headerTitle: selectedMeal.title,
		// HeaderButtonComponent tells the Headerbuttons which custom 
		// component to use to render the item specified within
		headerRight: () => {
			return (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					{/* title specified as fallback if icon is not found or specified
					 // title gets used as a key so multiple items should have different titles */}
					<Item title="Favorite" iconName='ios-star' onPress={() => {
						console.log('Mark as Favorite');
					}} />
				</HeaderButtons>
			);
		}
	};
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200
	},
	details: {
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center'
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10
	}
});

export default MealDetailsScreen;