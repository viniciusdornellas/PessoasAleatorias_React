import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserList from './components/UserList';


const App = () => {
  return (
    <View style={styles.container}>
      <UserList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#f5fcff',
  },
});

export default App;