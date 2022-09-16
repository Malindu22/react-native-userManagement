import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Modal, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Login({ navigation }) {
    const [text, onChangeText] = useState("");
    const [password, onChangePassword] = useState("");
    const [isloading, loading] = useState(false);
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const { isAuth, setAuth } = React.useContext(AuthContext);

    useEffect(() => {
        saveTokenData()
    }, [token]);

    const login = () => {
        if (text == '' || password == '') {
            setError('Some Field are Empty..')
            return;
        } else {
            setError('')
            loginUser()
        }
    }

    const saveTokenData = async () => {
        if (token == '') { return; }
        try {
            await AsyncStorage.setItem('TOKEN', token)
            setAuth(true)
            console.log("save Token");
        } catch (e) {
            console.log("fail save token", e);
        }
    }

    const loginUser = async () => {
        loading(true)
        let Userdata = {
            email: text,
            password: password,
        }
        await fetch(global.MainUrl + '/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Userdata)
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson)
            if (responseJson.status) {
                setToken(responseJson.token)
            }
            toast(responseJson?.msg, {
                duration: 1000,
                icon: '👏',
                position: 'bottom-center',
                iconTheme: {
                    primary: '#000',
                    secondary: '#fff',
                },
                style: {
                    background: responseJson.status ? 'green' : 'red',
                    color: 'white'
                },
            })
        }).catch((error) => {
            console.error(error);
        }).finally(() => loading(false))
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.inputs}>
                    <Text style={styles.mainText}>Login</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder="Password"
                    />
                    <Text style={styles.errMsg}>{error}</Text>
                    <View style={styles.loginBtn}>
                        {
                            isloading ? <ActivityIndicator size="small" color="#841584" /> :
                                <Button
                                    title="Login"
                                    color="#841584"
                                    onPress={login}
                                />
                        }
                    </View>
                    <Text style={styles.registerText}>Don't have an account yet?  <Text style={styles.clickBtn} onPress={() => navigation.navigate('Register')}>Register Here.</Text></Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%'
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        // flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    inputs: {
        padding: 20,
        width: '100%'
    },
    mainText: {
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        padding: 10,
        margin: 5,
        backgroundColor: '#fefefe'
    },
    loginBtn: {
        margin: 5,
        marginTop: 10,
    },
    registerText: {
        margin: 15,
    },
    clickBtn: {
        color: "#841584"
    },
    errMsg: {
        margin: 5,
        marginLeft: 10,
        fontSize: 13,
        color: '#ff0000'
    }
})