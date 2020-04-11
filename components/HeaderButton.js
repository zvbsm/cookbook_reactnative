import React from 'react';
import { Platform } from 'react-native';
// when creating the custom button, import HeaderButton 
// (HeaderButtons is used in the view that implements this component)
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
	return (
		// ...props forwards all the props to the HeaderButton
		// IconComponent must be provided icons from @expo or react
		<HeaderButton 
			{...props} 
			IconComponent={Ionicons} 
			iconSize={23} 
			color={Platform.OS === 'android' ? 'white' : Colors.primaryColor} 
		/>
	);
};

export default CustomHeaderButton;