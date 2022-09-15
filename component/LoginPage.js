import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Modal, ActivityIndicator } from 'react-native';


export default function Login({ navigation }) {
    const [text, onChangeText] = useState("");
    const [password, onChangePassword] = useState("");
    const [isloading, loading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // navigation.navigate('Home')
    }, []);

    const login = () => {
        if (text == '' || password == '') {
            setError('Some Field are Empty..') 
            return;
        }else{
            setError('') 
            loginUser()
        }
    }

    const loginUser = async() => {
        loading(true)
        let Userdata = {
            email: text,
            password: password,
        }
        await fetch('http://192.168.1.31:3000/api/login', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(Userdata)
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
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
                        placeholder="Name"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder="Password"
                    />
                    <Text style={styles.errMsg}>{ error }</Text>
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
    errMsg:{
        margin: 5,
        marginLeft: 10,
        fontSize: 13,
        color: '#ff0000'
    }
})