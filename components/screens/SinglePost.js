import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import {
    Avatar,
    Card,
    Title,
    Paragraph,
    List, 
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons} from '@expo/vector-icons';
import ImageLoad from 'react-native-image-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Animated, Text,
    ScrollView,
    TouchableOpacity,
    View,
    Dimensions, ActivityIndicator,
} from 'react-native';

import moment from 'moment';

import {Colors} from "../utils/colors";
import { gamesApi } from '../api';
import {MOVIE_CONTENT_WIDTH, SPACE_LG2, SPACE_SM} from "./../utils/sizes";
import {ContentStyles} from '../slide/Styles';
import {Rating, Tagger } from "../common";


const usePost = (post_id) => useQuery([ 'post${post_id}', post_id ], () => gamesApi.fetchOne(post_id));

const contentWidth = MOVIE_CONTENT_WIDTH - SPACE_LG2;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const cardPerSlide = 1
const cardPadding = 15
const paddingAround = cardPadding * 2 // slide horizontal padding
const cardBetweenPadding = cardPadding * (cardPerSlide - 1)
const totalPadding = paddingAround + cardBetweenPadding
const imageWidth = (screenWidth - totalPadding) / cardPerSlide
const imageHeight = (imageWidth / (2 / 3))




const SinglePost = ({ route }) => {
  
  const { post_id } = route && route.params;
      
    const [bookmark, setbookmark] = useState(false);

    
      useEffect(() => {
        renderBookMark(post_id);
    }, []);

       const { data, isLoading } = usePost(post_id);
        
    
    const saveBookMark = async post_id => {
        setbookmark(true);
        await AsyncStorage.getItem('bookmark').then(token => {
            const res = JSON.parse(token);
            if (res !== null) {
                let data = res.find(value => value === post_id);
                if (data == null) {
                    res.push(post_id);
                    AsyncStorage.setItem('bookmark', JSON.stringify(res));
                    alert('Your bookmark post');
                }
            } else {
                let bookmark = [];
                bookmark.push(post_id);
                AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
                alert('Your bookmark post');
            }
        });
    };
    const removeBookMark = async post_id => {
        setbookmark(false);
        const bookmark = await AsyncStorage.getItem('bookmark').then(token => {
            const res = JSON.parse(token);
            return res.filter(e => e !== post_id);
        });
        await AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
        alert('Your unbookmark post');
    };
    const renderBookMark = async post_id => {
        await AsyncStorage.getItem('bookmark').then(token => {
            const res = JSON.parse(token);
            if (res != null) {
                let data = res.find(value => value === post_id);
                return data == null ? setbookmark(false) : setbookmark(true);
            }
        });
    };
    if (isLoading) {
        return (
            <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                 <ActivityIndicator color='#e57373'/>
            </View>
        )
    } else {
        return (
          <View style={{
                    flex: 1,
                    backgroundColor: Colors.white
                }}>
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title>{data.title}</Title>

                        <List.Item
                           title={`${data.production_companies[0].name}`}
                            description={`${data.tagline}`}
                            left={props => {
                                return (
                                    <Avatar.Image
                                        size={55}
                                        source={{  uri: gamesApi.getImageURL(data.production_companies[0].logo_path, 200), }}
                                    />
                                );
                            }}
                            right={props => {
                                if (bookmark == true) {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => removeBookMark(data.id)}>
                                            <MaterialCommunityIcons name="bookmark" size={30} />
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => saveBookMark(data.id)}>
                                            <MaterialCommunityIcons
                                                name="bookmark-outline"
                                                size={30}
                                            />
                                        </TouchableOpacity>
                                    );
                                }
                            }}
                        />                        
                        <Paragraph />
                    </Card.Content>
                    <View style={{ flexDirection: 'row', width: screenWidth, paddingHorizontal: cardPadding }}>
            <View style={{ width: imageWidth }}>
              <ImageLoad source={{ uri: gamesApi.getImageURL(data.poster_path, 300) }}
                style={{ width: imageWidth, height: imageHeight }} />
            </View>            
          </View>
                    <Card.Content>
                      <Animated.ScrollView >
                        <Animated.View style={ContentStyles.container }>
                            <View style={ContentStyles.ratingControl}>
                                <Rating
                                    rating={data.vote_average}
                                    size={24}
                                />
                                <Text style={ContentStyles.ratingNumber}>
                                User Score {data.vote_average}
                                </Text>
                            </View>
                            <View style={ContentStyles.shortDetailsWrapper}>
                                <View style={ContentStyles.shortDetails}>
                                    <MaterialIcons
                                        name="access-time"
                                        size={16}
                                        color={Colors.darkGray}
                                    />
                                    <Text style={ContentStyles.shortDetailsText}>
                                    Duration of the movie {data.runtime} min
                                    </Text>
                                </View>
                                <View style={ContentStyles.shortDetails}>
                                    <MaterialCommunityIcons
                                        name="movie-roll"
                                        size={16}
                                        color={Colors.darkGray}
                                    />
                                    <Text style={ContentStyles.shortDetailsText}>
                                    Released {moment(data.release_date, "YYYY-MM-DD").format('MMM DD.YYYY')}
                                    </Text>
                                </View>
                            </View>
                            <Tagger tags={data.genres}/>
                            <Animated.View style={{
                                height: -1,
                                opacity: 1,
                            }}>
                                <Text>{data.overview}</Text>
                            </Animated.View>
                            <View style={{
                                marginTop: SPACE_SM,
                                justifyContent: 'flex-end',
                                width: '100%',
                            }}>
                               
                            </View>
                        </Animated.View>
                        
                    </Animated.ScrollView>

                        
                    </Card.Content>
                </Card>
                <View>                          
                
                        </View>
            </ScrollView>
            </View>
        );
    }
}
export default SinglePost 