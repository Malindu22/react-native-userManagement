import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Modal, ActivityIndicator } from 'react-native';


export default function Register({ navigation }) {
    const [text, onChangeText] = useState("");
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [conPassword, onChangeConPassword] = useState("");
    const [isloading, loading] = useState(false);
    const [error, setError] = useState('');

    const RegisterUser = () => {
        if (text == '' || email == '' || password == '' || conPassword == '' ) { 
            setError('Some Field are Empty..') 
            return;
        }else if(password != conPassword){
            setError('Password Not Match..') 
            return;
        }else{
            setError('') 
            saveRegisterUser()
        }
    }

    const saveRegisterUser = async() => {
        loading(true)
        let Userdata = {
            name: text,
            email: email,
            password: password,
        }
        await fetch('http://192.168.1.31:3000/api/register', {
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
                    <Text style={styles.mainText}>Register</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Name"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder="Password"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeConPassword}
                        value={conPassword}
                        placeholder="Confirm Password"
                    />
                    <Text style={styles.errMsg}>{ error }</Text>
                    <View style={styles.registerBtn}>
                    {
                        isloading ? <ActivityIndicator size="small" color="#841584" /> :
                            <Button
                                title="Register"
                                color="#841584"
                                onPress={RegisterUser}
                            />
                    }
                    </View>
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
    registerBtn:{
      margin: 5,
      marginTop: 10,
    },
    errMsg:{
        margin: 5,
        marginLeft: 10,
        fontSize: 13,
        color: '#ff0000'
    }
})