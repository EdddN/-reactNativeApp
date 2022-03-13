// List.js
import React, { useState, useEffect, Fragment } from "react";
import {
  FlatList,
   SafeAreaView
} from 'react-native';
import {  SearchBar } from 'react-native-elements';
import Card from './Card';

const List = ({ list, removeItem }) => {
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    setFiltered(list);
  }, [list]);

  
const updateQuery = (input) => {
        setQuery(input);
    let currentList = [];
    let newList = [];
     if (input !== "") {
      currentList = list;
      newList = currentList.filter(item => {
        const lc = item.title.toLowerCase();
       
        const filter = query.toLowerCase();
     
        return lc.includes(filter);
      });
    } else {
      newList = list;
    }
    setFiltered(newList);
  }

    const ItemView = ({item}) => {
    return (
            <Card item={item} removeItem={removeItem} />
    );
  };


  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        placeholder="Search..." 
        onChangeText={updateQuery}
        value={query}  
      />      
        <FlatList
        data={filtered}
          renderItem={ItemView}
          keyExtractor={item => `${item.id}`}
        />      
    </SafeAreaView>
  );
};

export default List;
