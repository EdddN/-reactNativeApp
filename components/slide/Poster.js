import React from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';

import {PosterStyles} from './Styles';

const Poster = ({poster: {uri, width, height}}) => (
    <View style={PosterStyles.container}>
        <View style={[PosterStyles.content, {
            width,
            height
        }]}>
            <Image
                style={PosterStyles.poster}
                resizeMode='contain'
                source={{uri}}
            />
        </View>
    </View>
);

Poster.propTypes = {
    poster: PropTypes.shape({
         uri: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }).isRequired
};

export {Poster};