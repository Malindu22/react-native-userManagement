import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Modal, ActivityIndicator } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

export default function UserPage({ navigation }) {
    const [text, onChangeText] = useState("");
    const [age, onChangeNumber] = useState("");
    const [checked, setChecked] = useState('male');
    const [btnText, setBtnText] = useState('add');
    const [isloading, loading] = useState(false);

    const route = useRoute()

    const saveChanges = async() => {
        loading(true)
        let Userdata = {
            name: text,
            age: age,
            gender: checked == 'male' ? "Male" : "Female"
        }
        let url = 'http://192.168.1.31:3000/api/add';
        let reqMethod = "POST"
        if (route.params.isEdit) {
            url = 'http://192.168.1.31:3000/api/update/'+route.params.data._id
            reqMethod = "PATCH"
        }
        await fetch(url, {
            method: reqMethod,
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(Userdata)
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
            navigation.navigate('Home')
        }).catch((error) => {
            console.error(error);
        }).finally(()=> loading(false))
    }


    useEffect(() => {
        if (route.params.isEdit) {
            onChangeText(route.params.data.name)
            onChangeNumber(route.params.data.age)
            setChecked(route.params.data.gender == "Male" ? 'male' : 'female')
            setBtnText(route.params.isEdit ? "Edit" : "Add")
        }
    }, []);


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
                {
                    isloading ? <ActivityIndicator size="small" color="#841584" /> :
                        <Button
                            style={styles.newuserbtn}
                            title={btnText}
                            color="#841584"
                            onPress={saveChanges}
                        />
                }
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