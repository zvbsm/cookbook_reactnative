import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback } from 'react-native';

const CategoryGridItem = props => {
	let TouchComponent = TouchableOpacity;
	// if android conditions are met, replace touchableOpacity with android specific touch behavior
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchComponent = TouchableNativeFeedback;
	}
	
	return (
		// original way of setting up without touchableNativeFeedback being used
		// <TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
		// 	<View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
		// 		{/* numberOfLines 2 will cut off any text that would have been pushed to a third line */}
		// 		<Text style={styles.title} numberOfLines={2}>{props.title}</Text>
		// 	</View>
		// </TouchableOpacity>

		// revised layout wrapped in View to correct styling for new touchableNativeFeedback component
		<View style={styles.gridItem}>
			<TouchComponent style={{ flex: 1 }} onPress={props.onSelect}>
			<View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
				{/* numberOfLines 2 will cut off any text that would have been pushed to a third line */}
				<Text style={styles.title} numberOfLines={2}>{props.title}</Text>
			</View>
		</TouchComponent>
		</View>
		
	)
};

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		margin: 15,
		height: 150,
		// added for TouchComponent flow
		borderRadius: 10,
		elevation: 3,
		// overflow hidden will crop any shadow effects applied on ios
		overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden': 'visible'
	},
	container: {
		flex: 1,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 10,
		padding: 10,
		// text in grid item gets placed at the bottom right
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		// text split into 2 lines on android was aligned to left
		// so this will ensure all text on both devices aligns to right
		textAlign: 'right'
	}
});

export default CategoryGridItem;