import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductComponent'>;

export const ProductComponent: React.FC<Props> = ({ route }) => {
  const { product } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text>Nom : {product.name}</Text>
      <Text>Nutriscore : {product.nutriscore}</Text>
      <Text>Code-barres : {product.barcode}</Text>
      <Text>Marque : {product.brand}</Text>
    </SafeAreaView>
  );
};
