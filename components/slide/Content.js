import React from 'react';
import PropTypes from 'prop-types';
import {Animated, Text, View} from 'react-native';
import {Rating } from "../common";
import {ContentStyles} from '../slide/Styles';
import {MOVIE_CONTENT_WIDTH, SPACE_LG2,} from "./../utils/sizes";
const contentWidth = MOVIE_CONTENT_WIDTH - SPACE_LG2;

const Content = ({item, style}) => (
    <Animated.ScrollView >
                        <Animated.View style={[ContentStyles.container, {
                            width: contentWidth
                        }]}>
                            <Text style={ContentStyles.title}>
                                {item.title}
                            </Text>
                            <View style={ContentStyles.ratingControl}>
                                <Rating
                                    rating={item.vote_average}
                                    size={24}
                                />
                                <Text style={ContentStyles.ratingNumber}>
                                User Score {item.vote_average}
                                </Text>
                            </View>                            
                            </Animated.View>
                            <View style={{ width: 16, backgroundColor: 'pink' }}/>
                      </Animated.ScrollView>
);

Content.propTypes = {
    item: PropTypes.object.isRequired
};

export {Content};