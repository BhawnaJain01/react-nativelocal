import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import Test from './test';

export default function App() {
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <Text>Hii this is my new text for testing but i dont know what to do!</Text>
      <Test/>
      <StatusBar style="auto" />
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
