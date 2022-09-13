import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, SectionList } from 'react-native';
import HomePage from './component/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserPage from './component/UserPage';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      // <HomePage/>
      <NavigationContainer>
       <Stack.Navigator initialRouteName="Home">
         <Stack.Screen name="Home" component={HomePage} />
         <Stack.Screen name="User" component={UserPage} />
       </Stack.Navigator>
      </NavigationContainer>
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.content}>
    //     <Text style={styles.title}>User Management</Text> 
    //     <Button
    //       style={styles.newuserbtn}
    //       onPress={()=>{}}
    //       title="Add New User"
    //       color="#841584"/> 
    //        {this.DATA.map(d => (<li key={d.title}>{d.title}</li>))} 
    //         {/* <View style={styles.card}>
    //           <Text>Hello</Text>
    //         </View> */}
    //   </View>
    //   <StatusBar style="auto" />
    // </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  content:{
    padding: 10,
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  newuserbtn:{
    marginBottom:40,
  },
  card:{
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
});
