import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import CommentsScreen from './src/screens/CommentsScreen';



const App = () => {
  return (
    <View style={styles.app}>
      {/* <HomeScreen /> */}
      <CommentsScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
