import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';
import { Product } from '../../src/search/entities/Product';
import OpenFoodFactProductService from '../../src/search/repository/OpenFoodFactProductService';
import { SearchService } from '../../src/search/services/SearchService';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home: React.FC<Props> = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const searchService = new SearchService(setProduct, new OpenFoodFactProductService());

  const handleSearch = async () => {
    const result = await searchService.searchByBarcode(inputValue);
    if (!result || result.error) {
      Alert.alert("Erreur", result?.error || "Produit introuvable");
      return;
    }
    setInputValue('');
    navigation.navigate('ProductComponent', { product: result });
  };
  
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Code barre"
        value={inputValue}
        onChangeText={setInputValue}
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Rechercher" onPress={handleSearch} />
    </SafeAreaView>
  );
};
