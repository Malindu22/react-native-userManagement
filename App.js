import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, SectionList } from 'react-native';
import HomePage from './component/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserPage from './component/UserPage';
import LoginPage from './component/LoginPage';
import Register from './component/Register';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './component/AuthContext';
import Toast from 'react-native-toast-message';
import toast, { Toaster } from 'react-hot-toast';

const Stack = createNativeStackNavigator();

global.MainUrl = 'http://localhost:3000'

export default function App() {
  const [isAuth, setAuth] = useState(false)

  useEffect(() => {
    getToken()
  }, []);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("TOKEN");
      console.log(value)
      if (value !== null && value !== '') {
        setAuth(true)
      }
    } catch (e) {
      console.log("get token err")
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            !isAuth ?
              <>
                <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
                <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
              </>
              :
              <>
                <Stack.Screen options={{ headerBackVisible: false, headerLeft: () => { } }} name="Home" component={HomePage} />
                <Stack.Screen name="User" component={UserPage} />
              </>
          }
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
      <Toaster/>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  newuserbtn: {
    marginBottom: 40,
  },
  card: {
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
