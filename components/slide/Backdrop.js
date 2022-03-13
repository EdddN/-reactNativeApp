import React from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';

import {BackdropStyles} from './Styles';

const Backdrop = ( {uri}) => (
    <View style={BackdropStyles.container}>
        <Image
            style={BackdropStyles.image}
            blurRadius={2}
            source={{uri}}
            resizeMode={'cover'}
        />
    </View>
);

Backdrop.propTypes = {
    backdrop: PropTypes.shape({
        uri: PropTypes.any
    })
};

export {Backdrop};