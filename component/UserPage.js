import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Modal, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

export default function UserPage({ navigation }) {
    const [text, onChangeText] = useState("");
    const [age, onChangeNumber] = useState("");
    const [checked, setChecked] = useState('male');

    const saveChanges = ()=>{
        console.log("data",text,age,checked)
    }

    

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={age}
                    placeholder="Age"
                    keyboardType="numeric"
                />
                <View style={styles.redioBtn}>
                    <View style={styles.redioBtn}>
                        <RadioButton
                            color='#841584'
                            value="male"
                            status={checked === 'male' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('male')} />
                        <Text style={styles.radioBtnText}>Male</Text>
                    </View>
                    <View style={styles.redioBtn}>
                        <RadioButton
                            color='#841584'
                            value="female"
                            status={checked === 'female' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('female')} />
                        <Text style={styles.radioBtnText}>Female</Text>
                    </View>
                </View>
                <Button
                    style={styles.newuserbtn}
                    title="Add"
                    color="#841584"
                    onPress={saveChanges}
                />
            </SafeAreaView>
        </View>
    );

}

const styles = StyleSheet.create({
    input: {
        borderColor: '#f44336',
        backgroundColor: '#fefefe',
        margin: 2,
        padding: 10,
    },
    container: {
        padding: 10,
    },
    redioBtn: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    radioBtnText: {
        paddingTop: 10,
    },
});