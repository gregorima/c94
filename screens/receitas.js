import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput } from 'react-native';

const db2 = require("../dbreceitas.json")

export default function Receitas() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(db2);
  const [masterData, setMasterData] = useState(db2);

  useEffect(() => {
   
        setFilteredData(db2);
        setMasterData(db2);
     
  }, []);

  const ItemView = ({ item }) => {
    return (
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.id}
        {' - '}
        {item.titulo.toUpperCase()}
      </Text>
    );
  };

  const getItem = (item) => {
    alert('Id : ' + item.id + '\n\nTarefa : ' + item.title + '\n\nCompletada: ' + item.completed);
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter(
        function (item) {
          if (item.titulo) {
            const itemData = item.titulo.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1;
          }
        });
      setFilteredData(newData);
    } else {
      setFilteredData(masterData);
    }
    setSearch(text);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilter(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Procure Aqui"
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: 'white',
  },
  itemStyle: {
    backgroundColor: '#0066CC',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    color: 'white',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderRadius: 15,
    borderColor: '#0066CC',
  },
});
