import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default StyleSheet.create({
    icon: {
        marginHorizontal: 5,
      },
      bold: {
        fontWeight: fonts.weight.bold,
      },
      comment: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      avatar: {
        width: 40,
        aspectRatio: 1,
        borderRadius: 25,
        marginRight: 5,
      },
      middleColumn: {
        flex: 1,
      },
      commentText: {
        color: colors.black,     
      },
      footer: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      footerText: {
        marginRight: 10,
        color: colors.grey
      }, 
      
      
})