import React, { useEffect, useState, Fragment } from 'react';
import { View, Image,ActivityIndicator, StyleSheet,SafeAreaView, StatusBar,  } from 'react-native';
import { useQueries } from "react-query";
import { Text } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPosts} from '../hooks/usePost';
import colors from '../constants/colors';
import List from './List';

function renderFooter() {
        if (isFetchingNextPage) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: '#CED0CE',
                }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    }


const Bookmark = ({ navigation }) => {
  const [bookmarkpost, setbookmarkpost] = useState([]);
  const isFocused = useIsFocused();
     
  useEffect(() => {
        fetchBookMark();
    }, [isFocused]);
    
    const fetchBookMark = async () => {
        await AsyncStorage.getItem('bookmark').then(async (token) => {
          let  res = JSON.parse(token);
            
            if (res) {
                                          
                const post = res;
                setbookmarkpost(post);
                
            } else {
                setbookmarkpost([]);
              
            }
        });
    };
  
  const results  = useQueries(
        bookmarkpost.map((id) => {
        return {
          queryKey: ["film", id],
          queryFn: ({ queryKey: [, id] }) =>  fetchPosts(id)        
        };
      })
  ); 
  
if (results.some(r => r.isLoading)) 
return <View style={{ marginTop: 30, padding: 12 }}>
                <ActivityIndicator color='#e57373'/>
            </View>
            

if (results.some(r => r.isError)) {
  const first = results.find(r => r.error)
  console.log( <Text>Error: error={first.error} </Text>)
}

else if (bookmarkpost.length == 0) {

        return (
            <View style={{ textAlign: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <Image source={require('../../assets/image/nobookmark.png')} />
            </View>
        );
    }

 const resData = results.filter(r =>r.data).map(r => r.data);
 
 var recipeArray = [...new Set(resData)];
 
 //console.log('recipeArray.length', recipeArray.length)  

  const removeBookMark = async post_id => {
       
        const bookmark = await AsyncStorage.getItem('bookmark').then(token => {
            const res = JSON.parse(token);
            return res.filter(e => e !== post_id);
        });
        await AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
        alert('Your unbookmark post');
    }; 

   return (
     <SafeAreaView style={{flex: 1}}>
      <Fragment>
      <List list={recipeArray} removeItem={removeBookMark} />      
    </Fragment>
    </SafeAreaView>
  );
}

export default Bookmark;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		padding: 10,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
	},
	wrapper: {
		flex: 1,
		paddingVertical: 30
	},
	item: {
		paddingVertical: 10,
		paddingHorizontal: 20
	},
	header: {
		textAlign: 'center',
		textTransform: 'capitalize',
		fontWeight: 'bold',
		fontSize: 30,
		color: colors.primary,
		paddingVertical: 10
	},
	post: {
		backgroundColor: colors.primary,
		padding: 15,
		borderRadius: 10,
		marginBottom: 20
	},
	postTitle: { color: colors.white, textTransform: 'capitalize' }
});