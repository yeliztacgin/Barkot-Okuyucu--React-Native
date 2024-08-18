import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
export default function Page() {
  const tikla=()=>{
    router.replace({
      pathname:"/barkod"
     })
  }
  return (
    <View style={styles.container}>
    
      <View style={styles.main}> 
         <ImageBackground style={{width:380,height:450}} source={require('../assets/5703566.jpg') }>
        <TouchableOpacity onPress={tikla}>
        <Text style={styles.title}>BARKOD OKUYUCU</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom:30,
    textAlign:'center',
    marginRight:23
  },
 
});
