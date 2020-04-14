// input components need their values stored and handled by state management
// useEffect is used to trigger a function when the state changes
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
	return (
		<View style={styles.filterContainer}>
			<Text>{props.label}</Text>
			<Switch
				//trackColor takes an object while thumbColor takes a string
				trackColor={{ true: Colors.primaryColor }}
				thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
				value={props.stateValue}
				onValueChange={props.onChange} />
		</View>
	);
}

const FiltersScreen = props => {

	// to avoid unnecessary re-renders of props when using useEffect to access navigation
	// this method of 'object de-structering' extracts the values and stores them in
	// a seperate variable. 
	const { navigation } = props;

	const [isGlutenFree, setIsGlutenFree] = useState(false);
	const [isLactoseFree, setIsLactoseFree] = useState(false);
	const [isVegan, setIsVegan] = useState(false);
	const [isVegetarian, setIsVegetarian] = useState(false);
	const dispatch = useDispatch();
	// by wrapping the method in useCallback, saveFilters gets cached and is only
	// recreated when its dependencies change. anything else in the component that
	// triggers saveFilters to re-render will not also recreate the method.
	// useEffect is triggered when saveFilters is recreated
	const saveFilters = useCallback(() => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,
			vegan: isVegan,
			vegetarian: isVegetarian
		}
		
		dispatch(setFilters(appliedFilters));
		
		// specify the variables that are to be used as dependencies for useCallback
		// this will make saveFilters be re-created when any of these values are changed
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

	useEffect(() => {
		// setParams is used to update the params for the current screen
		// the new params would be merged with the existing params
		// setParams will cause saveFilters to rebuild, hence why useCallback must be
		// added to avoid unnecessary recreations. 
		// this is necessary to avoid an infinite loop of recreating and rerendering.
		navigation.setParams({
			save: saveFilters
		});
		// useEffect only uses saveFilters when saveFilters holds a value
		// by adding it to the array of inputs
	}, [saveFilters]);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			<FilterSwitch label='Gluten-Free' stateValue={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
			<FilterSwitch label='Lactose-Free' stateValue={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
			<FilterSwitch label='Vegan' stateValue={isVegan} onChange={newValue => setIsVegan(newValue)} />
			<FilterSwitch label='Vegetarian' stateValue={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
		</View>
	)
};

FiltersScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Filter Meals',
		headerLeft: () => {
			return (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item title="Menu" iconName='ios-menu' onPress={() => {
						navData.navigation.toggleDrawer()
					}} />
				</HeaderButtons>
			);
		},
		headerRight: () => {
			return (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item title="Save" iconName='ios-save' onPress={
						// getParam must be used for a header button to access the data in the screen
						// and do something with it. this must be implemented along with useEffect to
						// update the params for this specific screen.
						navData.navigation.getParam('save')
					} />
				</HeaderButtons>
			);
		}
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		margin: 20,
		textAlign: 'center'
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 15
	}
});

export default FiltersScreen;