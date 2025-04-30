import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../../store';

export const ProductComponent: React.FC = () => {
  const product = useStore(state => state.product);

  if (!product) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Text>Aucun produit sélectionné.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text>Nom : {product.name}</Text>
      <Text>Nutriscore : {product.nutriscore ?? 'non communiqué'}</Text>
      <Text>Code-barres : {product.barcode}</Text>
      <Text>Marque : {product.brand ?? 'non trouvée'}</Text>
    </SafeAreaView>
  );
};
