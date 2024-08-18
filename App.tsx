import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'}}>
      <Text style={{fontSize:50,fontStyle:'normal'}} >BARKOD OKUYUCU</Text>
      <StatusBar style="auto" />
    </View>
  );
}


