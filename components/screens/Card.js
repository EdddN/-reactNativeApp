// import React in our code
import React from 'react';
import {
    Avatar,
    Card,
    Title,
    Paragraph,
    List, 
} from 'react-native-paper';

// import all the components we are going to use
import {
  View,
  StyleSheet,
  Text,
    Animated,
  TouchableOpacity,
  } from 'react-native';


import {Ionicons} from '@expo/vector-icons';
import moment from 'moment';
import {SPACE_MD} from "../constants/sizes";
import {Colors} from "../constants/colors";
import PosterSlide from '../common/Slide/PosterSlide';
import { Tagger} from "../common";
import { gamesApi } from '../api';


const Cards = (props) => {
  
  const {removeItem, item} = props;
 
   const {
  title,
    release_date,
  genres,
  overview,
  poster_path,  
  production_companies,
  tagline,
  } = item;

  
  return (
    <Animated.View style={{flex: 1, alignItems: 'center', paddingVertical: 10}}>
      
      <Card><Card.Content>
                         <View style={{
                paddingHorizontal: SPACE_MD,
                flexDirection: 'row'
            }}>
        
                   <Title>{title}</Title>
                   <View style={{
                    width: 20,
                    justifyContent: 'center'
                }}></View>
                   <View style={{
                    width: 24,
                    justifyContent: 'center'
                }}>
                   {
<TouchableOpacity
                            onPress={() => removeItem(item.id)}
                        >
                            <Ionicons
                                name="trash-outline"
                                color={Colors.red}
                                size={24}
                            />
                        </TouchableOpacity>
}</View>
      </View>

                        <List.Item
                            title={`${production_companies[0].name}`}
                            description={`${tagline}`}
                            left={props => {
                                return (
                                    <Avatar.Image
                                        size={55}
                                        source={{
                                          uri: gamesApi.getImageURL(production_companies[0].logo_path, 200),
                                        }}
                                    />
                                );
                            }}
                        />
                        <List.Item
                            title={`Published on ${moment(
                                release_date,
                                'YYYYMMDD',
                            ).fromNow()}`}
                        />
             <Paragraph />
                    </Card.Content>
                    
                          <PosterSlide                
                cards={poster_path}
                style={{
                  width:20,
                  height:20,
                    opacity:1
                }}
            />
                    
                    <Card.Content>
                    <Text>{`${overview}`}</Text>
                    </Card.Content>
                    <Tagger tags={genres}/>
                </Card>
    </Animated.View>
  );
};
export default Cards;

const styles = StyleSheet.create({
  container: {
    height: 80,
    elevation: 3,
    borderColor: 'gray',
    borderRadius: 5,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  metaDataContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 70,
    height: 70,
  },
  metaDataContent: {
    marginTop: 5,
    marginLeft: 15,
  },
  title: {
    color: '#444',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#888',
    fontWeight: '700',
  },
});
