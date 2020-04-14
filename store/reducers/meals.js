import { MEALS } from '../../data/dummyData';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

// meals reducers updating logic
// e.g. marking a meal as favorite or responding to set filters

const initialState = {
	// all the meals in the app
	meals: MEALS,
	// the list of meals after filter has been applied
	filteredMeals: MEALS,
	// meals the user has marked as favorites
	favoriteMeals: []
}

// state - the current/new state to be returned for react to work with
// action - what should react do when handling the state change
const mealsReducer = (state = initialState, action) => {
	switch(action.type) {
		case TOGGLE_FAVORITE:
			// if -1, the specified item does not exist in the array, so user is adding to the list
			// otherwise removing, so splice from array
			const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
			if (existingIndex >= 0) {
				// ...state to create copy of existing array
				// then splice the specified meal from the array and provide that for new state to return
				const updatedFavoriteMeals = [ ...state.favoriteMeals ];
				updatedFavoriteMeals.splice(existingIndex, 1);
				// new state to return
				// first specify state overall, to prevent from losing any of the other data in the state
				// and only update favoriteMeals with the newly modified favoriteMeals array
				return { ...state, favoriteMeals: updatedFavoriteMeals }
			} else {
				// concat to take the existing array and add the new meal
				const meal = state.meals.find(meal => meal.id === action.mealId);
				return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) }
			};
		case SET_FILTERS:
			const appliedFilters = action.filters;
			// filter to return new array of all items that meet the conditions
			const filteredMeals = state.meals.filter(meal => {
				// if the filter setting specifies the given key (e.g. glutenFree)
				// but the meal is not of that key, then drop it from the list
				if (appliedFilters.glutenFree && !meal.isGlutenFree) {
					return false;
				}
				if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
					return false;
				}
				if (appliedFilters.vegetarian && !meal.isVegetarian) {
					return false;
				}
				if (appliedFilters.vegan && !meal.isVegan) {
					return false;
				}
				return true;
			});
			return { ...state, filteredMeals: filteredMeals };

		// default will be reached when the app starts and redux store is initialized
		default:
			return state;
	};
};

export default mealsReducer;