import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { SearchService } from '../../src/search/services/SearchService';
import { Product } from '../../src/search/entities/Product';
import OpenFoodFactProductService from '../../src/search/repository/OpenFoodFactProductService';



export const SearchCard = () => {
  const [inputValue, setInputValue] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const searchService = new SearchService(setProduct, new OpenFoodFactProductService());

  const handleSearch = () => {
    searchService.searchByBarcode(inputValue)
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        placeholder="Search"
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
        }}
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Search" onPress={handleSearch} />
      {product && (
        <View>
          <Text>nom : {product.name}</Text>
          <Text>nutriscore : {product.nutriscore}</Text>
          <Text>code bar :  {product.barcode}</Text>
          <Text>marque : {product.brand}</Text>
        </View>
      )}
    </View>
  );
};
