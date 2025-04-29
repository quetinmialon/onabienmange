import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Product } from '../../src/search/entities/Product';
import { Home } from './Home';
import { ProductComponent } from './ProductComponent';

export type RootStackParamList = {
  Home: undefined;
  ProductComponent: { product: Product };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductComponent" component={ProductComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
