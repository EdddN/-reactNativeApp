import React from 'react';
import { Box, Text, FlatList, Divider } from 'native-base';
import {  ActivityIndicator } from 'react-native'
import { useInfiniteQuery } from 'react-query';

import { gamesApi } from '../api';
import FlatlistItem from '../FlatlistItem'

const Home = ({ navigation }) => {
  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery('games', gamesApi.fetchAllGames, {
      getNextPageParam: lastPage => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }

        return lastPage;
      }
    });

    //console.log('data', data);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderSpinner = () => {
    return <ActivityIndicator animating size="large" />;
  };

  const gameItemExtractorKey = (item, index) => {
    return index.toString();
  };

  const renderData = item => {
   // console.log(item);
    return (
      <Box px={2} mb={8}>
        <Text fontSize='20'>{item.item.title}</Text>
        <Text>{item.item.id}</Text>
      </Box>
    );
  };

  return isLoading ? (
    <Box
      flex={1}
      backgroundColor='white'
      alignItems='center'
      justifyContent='center'
    >
      <ActivityIndicator animating size="large" />
    </Box>
  ) : (
    <Box flex={1} safeAreaTop backgroundColor='white'>
      <Box height={16} justifyContent={'center'} px={2}>
        <Text fontSize={28} fontWeight={'600'} color={'emerald.500'}>
        Trending Movies
        </Text>
      </Box>
      <Divider />
      <Box px={2}>
        <FlatList
          data={data.pages.map(page => page.results).flat()}
          keyExtractor={gameItemExtractorKey}
          renderItem={({ item }) => (
                        <FlatlistItem item={item} navigation={navigation} />
                    )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        />
      </Box>
    </Box>
  );
};

export default Home 