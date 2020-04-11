import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummyData';
import HeaderButton from '../components/HeaderButton';
import CategoryGridItem from '../components/CategoryGridItem';

const CategoriesScreen = props => {
	// must be within the CategoriesScreen object to make
	// navigation accessible to the method
	const renderGridItem = (itemData) => {
		return <CategoryGridItem 
			title={itemData.item.title} 
			color={itemData.item.color}
			onSelect={() => {
				// params just like angular ui-router
				props.navigation.navigate({
					routeName: 'CategoryMeals', params: {
						categoryId: itemData.item.id
					}
				});
			}}
		/>;
	}

	return (
		// numColumns creates a column grid
		//keyExtractor no longer needed in newer versions of react native
		<FlatList
			// keyExtractor={(item, index) => item.id}
			data={CATEGORIES}
			renderItem={renderGridItem}
			numColumns={2}
		/>

		// <View style={styles.screen}>
		// 	<Text>The Categories Screen!</Text>
		// 	<Button title="Go to Meals" onPress={() => {
		// 		// navigation becomes accessible in a component when the component has been
		// 		// loaded by the stack navigator
		// 		props.navigation.navigate({routeName: 'CategoryMeals'});

		// 		// replace() to go to screen, but replace current screen rather than adding to the stack
		// 		// props.navigation.replace('CategoryMeals');
		// 	}} />
		// </View>
	)
};

// in order for header button to use the navigation method, navigationOptions must
// be a method rather than an object, and pass navData
CategoriesScreen.navigationOptions = navData => {
	return {
		// manually specify the title to be displayed on the screens header
		headerTitle: 'Meal Categories',
		// after implementing the drawer navigator, the hamburger icon must be
		// manually set here in navigationOptions
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

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default CategoriesScreen;