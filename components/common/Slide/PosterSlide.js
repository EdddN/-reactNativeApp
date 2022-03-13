  import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { gamesApi } from '../../api';
import styles from './style'

class PosterSlide extends Component {
  render() {
    const { cards } = this.props
   
    const card  = gamesApi.getImageURL(cards, 300)            

    
    return <View style={styles.slide}>      
        <Image source={{ uri: card }} style={styles.imageCard}  />      
    </View>

  }
}

export default PosterSlide;