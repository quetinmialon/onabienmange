import React, { useState, useEffect } from 'react';
import { TextInput, Button, Alert, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';
import { Product } from '../../src/search/entities/Product';
import { SearchService } from '../../src/search/services/SearchService';
import CompositeProductRepository from '../../src/search/repository/CompositeProductRepository';
import  SQLiteProductRepository  from '../../src/search/repository/SQLiteProductRepository';
import  OpenFoodFactProductRepository  from '../../src/search/repository/OpenFoodFactProductRepository';
import { HistoryService } from '../../src/history/services/HistoryService';
import { SQLiteHistoryRepository } from '../../src/history/repository/SQLiteHistoryRepository';
import * as SQLite from 'expo-sqlite';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home: React.FC<Props> = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<Product[]>([]);

  const searchService = new SearchService(
    product => {
      if (product) {
        navigation.navigate('ProductComponent', { product });
      }
    },
    new CompositeProductRepository(
      new SQLiteProductRepository(SQLite.openDatabaseAsync('app.db')),
      new OpenFoodFactProductRepository()
    )
  );

  const historyService = new HistoryService(new SQLiteHistoryRepository(SQLite.openDatabaseAsync('app.db')));

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSearch = async () => {
    const result = await searchService.searchByBarcode(inputValue);
    if (!result || result.error) {
      Alert.alert('Erreur', result?.error || 'Produit introuvable');
      navigation.goBack();
      return;
    }
    await historyService.saveSearch(result);
    await loadHistory();
    searchService.redirectToProductPage(result);
  };

  const loadHistory = async () => {
    const historyData = await historyService.getHistory();
    setHistory(historyData);
  };


  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Code barre"
        value={inputValue}
        onChangeText={setInputValue}
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Rechercher" onPress={handleSearch}  />

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Historique des recherches</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.barcode}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductComponent', { product: item })}>
            <Text style={{ paddingVertical: 6 }}>{item.name} - {item.barcode} - {item.brand?? 'marque non trouvé'} - {item.nutriscore ?? 'nutriscore non communiqué'}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
