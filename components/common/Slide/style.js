import { StyleSheet, Dimensions } from 'react-native'
import { imageHeight, imageWidth, cardPadding } from '../../constants/config'
const { width: screenWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
  slide: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: screenWidth,
    paddingHorizontal: cardPadding
  },
  imageCard: {
    width: imageWidth,
    height: imageHeight
  }
});

export default styles