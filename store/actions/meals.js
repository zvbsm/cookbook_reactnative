// actions are typically an object with an identifier and payload
// TOGGLE_FAVORITE is the identifier
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";

// type - identifier
// mealId - payload
export const toggleFavorite = (mealId) => {
	return {
		type: TOGGLE_FAVORITE,
		mealId: mealId
	};
};

export const setFilters = filtersSettings => {
	return {
		type: SET_FILTERS,
		filters: filtersSettings
	}
};