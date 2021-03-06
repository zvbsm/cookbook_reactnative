import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { userSelector, useSelector } from 'react-redux';

import MealItem from './MealItem';

const MealList = props => {
	// hooks (useSelector) cannot be used in nested function, only the root function
	const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

	const renderMealItem = itemData => {
		const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);

		return (
			<MealItem
				title={itemData.item.title}
				image={itemData.item.imageUrl}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity}
				affordability={itemData.item.affordability}
				onSelectMeal={() => {
					props.navigation.navigate({
						routeName: 'MealDetails', 
						params: {
							mealId: itemData.item.id,
							// replacing the useEffect flow in MealDetailsScreen
							mealTitle: itemData.item.title,
							isFavorite: isFavorite
						}
					});
				}}
			/>
		);
	};

	return (
		<View style={styles.list}>
			<FlatList
				data={props.listData}
				renderItem={renderMealItem}
				style={{ width: '100%' }}
			/>
			{/* replaced with FlatList
			<Button title="Go to Details" onPress={() => {
				// alternatively push can be used for situations where
				// you want to go to a screen you're already on. could be used
				// for a situation where you want to use the same screen you're
				// already on but with different data loaded. 
				//props.navigation.push('MealDetailsScreen')
				props.navigation.navigate({routeName: 'MealDetailsScreen'});
			}} />
			// manually trigger back button behavior
			<Button title="Go Back" onPress={() => {
				// goBack is available outside of stack navigator
				props.navigation.goBack();
				// pops the current screen and goes back to previous screen
				// pop can only be used in a stack navigator
				//props.navigation.pop();
			}} /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default MealList;