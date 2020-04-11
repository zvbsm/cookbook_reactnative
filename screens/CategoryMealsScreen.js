import React from 'react';

import { CATEGORIES, MEALS } from '../data/dummyData';
import MealList from '../components/MealList';

const CategoryMealsScreen = props => {

	const categoryId = props.navigation.getParam('categoryId');
	// get the category object with matching id
	const selectedCategory = CATEGORIES.find(c => c.id === categoryId);
	// create list of meals that contain the categoryId selected
	// indexOf - will be -1 if the categoryId is not in the meal's list of categoryId's
	const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0)

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
	}
};

export default CategoryMealsScreen;