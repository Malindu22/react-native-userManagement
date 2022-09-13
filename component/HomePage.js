import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Modal, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserPage from './UserPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function HomePage({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const numbers = [1, 2, 3, 4, 5];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>User Management</Text>
                <Button
                    style={styles.newuserbtn}
                    title="Add New User"
                    color="#841584" 
                    onPress={() =>  navigation.navigate('User')}
                    />
                {numbers.map((d, index) => (
                    // <li key={d.title}>{d.title}</li>
                    <View key={index} style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.userName}>{d}</Text>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons style={styles.editBtn} name="md-pencil" size={15} color="#fff" onPress={() => { setModalVisible(!modalVisible); }} />
                                <Ionicons style={styles.deleteBtn} name="md-trash-bin" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            <StatusBar style="auto" />


            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable>
            </View>


        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        // paddingTop: 20,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
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
        marginTop: 10,
        marginBottom: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    cardContent: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    userName: {
        width: "80%",
    },
    actionBtn: {
        width: '20%',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between'
    },
    editBtn: {
        backgroundColor: "#bd93bd",
        padding: 3,
        borderRadius: 5,
    },
    deleteBtn: {
        backgroundColor: "#ff6464",
        padding: 3,
        borderRadius: 5,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

});