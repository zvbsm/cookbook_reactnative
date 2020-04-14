import React from 'react';
import { View, StyleSheet } from 'react-native';
// useSelector hook - select a 'slice' of state to use in component
// alternative to 'connect' function with map to props
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummyData';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = props => {
	const categoryId = props.navigation.getParam('categoryId');

	// useSelector to retrieve data from state
	// takes a function that gets the state as argument, 
	const availableMeals = useSelector(state => state.meals.filteredMeals);

	// create list of meals that contain the categoryId selected
	// indexOf - will be -1 if the categoryId is not in the meal's list of categoryId's
	const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0);

	if (displayedMeals.length <= 0) {
		return (
			<View style={styles.content}>
				<DefaultText>No meals found, check your filters.</DefaultText>
			</View>
		)
	}

	return (
		// forward navigation to the component with navigation= on the custom component
		<MealList listData={displayedMeals} navigation={props.navigation}/>
	);
};

// turning navigationOptions into a function allows for changing data dynamically
CategoryMealsScreen.navigationOptions = navigationData => {
	const categoryId = navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find(c => c.id === categoryId);
	return {
		headerTitle: selectedCategory.title
	};
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default CategoryMealsScreen;