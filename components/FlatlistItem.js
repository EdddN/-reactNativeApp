import React from 'react';
import { TouchableOpacity, Dimensions, ScrollView,View } from 'react-native';
import posed from 'react-native-pose';
import { gamesApi } from './api';
import {MainStyles} from "./Styles";
import {Backdrop, Content, Poster} from "./slide";
import {MOVIE_CONTENT_HEIGHT, screen, SPACE_LG,} from "./utils/sizes";
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const cardPerSlide = 1
const cardPadding = 15
const paddingAround = cardPadding * 2 // slide horizontal padding
const cardBetweenPadding = cardPadding * (cardPerSlide - 1)
const totalPadding = paddingAround + cardBetweenPadding
const imageWidth = (screenWidth - totalPadding) / cardPerSlide
const imageHeight = (imageWidth / (2 / 3))

const containerHMargin = SPACE_LG
const containerVMargin = screen.height / 4
const containerHeight = MOVIE_CONTENT_HEIGHT
const posterOpacity = 1

const PoseContainer = posed()({
    collapse: {
        containerHMargin: SPACE_LG,
        containerVMargin: screen.height / 3,
        containerHeight: MOVIE_CONTENT_HEIGHT,
        posterOpacity: 1,
        singlePosterTX: 0,
        singlePosterTY: 0,
        singlePosterScale: 1
    },
    expand: {
        containerHMargin: 0,
        containerVMargin: screen.height / 4,
        containerHeight: screen.height - screen.height / 4,
        posterOpacity: 0,
        singlePosterTX: -100,
        singlePosterTY: -50,
        singlePosterScale: 0.5
    }
});
    

const FlatlistItem = ({ item, navigation }) => {
  const pose = 'collapse'
      return (
      <TouchableOpacity
            onPress={() =>
                navigation.navigate('SinglePost', {
                    post_id: item.id,                    
                })
            }>
<View style={MainStyles.container}>

                <View style={MainStyles.backdrop}>
                    <ScrollView                      
                        
                        removeClippedSubviews={true}
                        
                        scrollEnabled={false}
                    >
                        <Backdrop
                
                uri={gamesApi.getImageURL(item.backdrop_path)}
            />
                    </ScrollView>
                </View>

                <View style={MainStyles.contentWrapper}>
                    <View style={MainStyles.contentBackground}>
                        <ScrollView                            
                            style={MainStyles.contentRoller}                            
                            removeClippedSubviews={true}                            
                            scrollEnabled={false}
                        >
                            <Content
                
                item={item}
                 style={MainStyles.contentItem} 
                  />
                        </ScrollView>
                    </View>
                </View>

                <View style={MainStyles.posterWrapper}>
                    
   <ScrollView
                        scrollEventThrottle={16}
                        
                        pagingEnabled={true}
                        
                        removeClippedSubviews={true}
                        
                    >
                        <Poster
                
                poster={{uri: gamesApi.getImageURL(item.poster_path, 300),
                    width: imageWidth,
                    height: imageHeight,
                     }}
            />
                    </ScrollView>
                    
                </View>
            </View>
            </TouchableOpacity>
    );
};
export default FlatlistItem