import React, { useEffect, useCallback } from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// useDispatch can not be using in navigationOptions same as useSelector
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	)
};

const MealDetailsScreen = props => {
	const availableMeals = useSelector(state => state.meals.meals);
	const mealId = props.navigation.getParam('mealId');
	// some() returns true if at least one item in array matches the condition
	const currentMealIsFavorite = useSelector(state => 
		state.meals.favoriteMeals.some(meal => meal.id === mealId)
	);
	const selectedMeal = availableMeals.find(meal => meal.id === mealId);

	const dispatch = useDispatch();
	const toggleFavoriteHandler = useCallback(() => {
		dispatch(toggleFavorite(mealId));
	}, [dispatch, mealId]);

	useEffect(() => {
		// by itself, this would trigger an infinite loop, so
		// wrap in useEffect to prevent it along with wrapping handler in useCallback 
		props.navigation.setParams({ toggleFavorite: toggleFavoriteHandler });
		// when input changes, trigger useEffect to setParams
	}, [toggleFavoriteHandler]);

	useEffect(() => {
		props.navigation.setParams({ isFavorite: currentMealIsFavorite });
	}, [currentMealIsFavorite]);

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
	);
};

// load data dynamically to the MealDetailsScreen by running the navigationData method
// thats provided by the navigation component by default
MealDetailsScreen.navigationOptions = navigationData => {
	// hooks (useSelector) can only be used inside of other hooks or functional components
	// therefore, cannot use in navigationOptions (normal function)

	const mealTitle = navigationData.navigation.getParam('mealTitle');
	const toggleFavorite = navigationData.navigation.getParam('toggleFavorite');
	const isFavorite = navigationData.navigation.getParam('isFavorite');

	return {
		headerTitle: mealTitle,
		// HeaderButtonComponent tells the Headerbuttons which custom 
		// component to use to render the item specified within
		headerRight: () => {
			return (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					{/* title specified as fallback if icon is not found or specified
					 // title gets used as a key so multiple items should have different titles */}
					<Item 
						title="Favorite" 
						iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} 
						onPress={toggleFavorite} 
					/>
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