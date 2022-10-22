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
      commentText: {
        color: colors.black,
        flex: 1,
      },
      comment: {
        flexDirection: 'row',
        alignItems: 'center',
      },
})