import {Text, View, StyleSheet, Image} from 'react-native';
import colors from './src/theme/colors';
import fonts from './src/theme/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const App = () => {
  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
          }}
          style={styles.userAvatar}
        />
        <Text style={styles.userName}>AndrewBrought</Text>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </View>

      {/* Content */}
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
        }}
        style={styles.image}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <AntDesign
            name={'hearto'}
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />

          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>

        {/* Likes */}
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>lgrinivicius</Text> and{' '}
          <Text style={styles.bold}>66 others</Text>
        </Text>

        {/* Post description */}
        <Text style={styles.text}>
          <Text style={styles.bold}>AndrewBrought</Text> Lorem ipsum dolor sit
          amet, consectetur adip. A Particular purplose asdfjklkjasdf jklasdlfkj
          lkjasdf thei s sid it fake writing of a post. So here it is!
        </Text>

        {/* Comments */}
        <Text style={styles.subText}>View all 16 comments</Text>
        <View style={styles.comment}>
          <Text style={styles.commentText}>
            <Text style={styles.bold}>AndrewBrought</Text> Lorem ipsum dolor sit
            amet, consectetur adip. A Particular purplose.
          </Text>
    
          <AntDesign
            name={'hearto'}
            style={styles.icon}
            color={colors.black}
          />
        </View>

        {/* Post date */}
        <Text style={styles.subText}>21 December, 2022</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // Remove after module 4
    marginTop: 40,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: fonts.weight.bold,
    color: colors.black,
  },
  threeDots: {
    marginLeft: 'auto',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  footer: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    color: colors.black,
    lineHeight: 18,
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
  subText: {
    color:colors.grey
  },
});

export default App;
