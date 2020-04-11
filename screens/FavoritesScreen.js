import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummyData';

const FavoritesScreen = props => {
	const favoriteMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');
	return <MealList listData={favoriteMeals} navigation={props.navigation}/>;
};

FavoritesScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Favorites',
		headerLeft: () => {
			return (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item title="Menu" iconName='ios-menu' onPress={() => {
						navData.navigation.toggleDrawer()
					}} />
				</HeaderButtons>
			);
		}
	};
};

export default FavoritesScreen;