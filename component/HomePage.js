import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Modal, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function HomePage({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [isloading, loading] = useState(true);
    const [deleteUserId, setDeleteUserId] = useState("");

    const getUserData = async() => {
        loading(true)
        await fetch('http://192.168.1.31:3000/api/view', {
            method: 'GET',
        }).then((response) => response.json()).then((responseJson) => {
            setData(responseJson)
            console.log(responseJson)
        }).catch((error) => {
            console.error(error);
        }).finally(() => loading(false))
    };

    const deleteUser = async() => {
        await fetch('http://192.168.1.31:3000/api/delete/'+deleteUserId, {
            method: 'DELETE',
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
        }).catch((error) => {
            console.error(error);
        }).finally(() => {loading(false);setModalVisible(!modalVisible);getUserData()})
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserData();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>User Management</Text>
                <Button
                    style={styles.newuserbtn}
                    title="Add New User"
                    color="#841584"
                    onPress={() => navigation.navigate('User', { isEdit: false })}
                />
                {
                    isloading ? <Text>Loading...</Text> :
                        data.map((d, index) => (
                            <View key={d._id} style={styles.card}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.userName}>{index + 1}.  {d.name}  (age {d.age})</Text>
                                    <TouchableOpacity style={styles.actionBtn}>
                                        <Ionicons style={styles.editBtn} name="md-pencil" size={15} color="#fff" onPress={() => { navigation.navigate('User', { data: d, isEdit: true }) }} />
                                        <Ionicons onPress={() => {setModalVisible(true);setDeleteUserId(d._id)}} style={styles.deleteBtn} name="md-trash-bin" size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
            </View>
            <StatusBar style="auto" />


            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Are You Sure Want to Delete User ?</Text>
                            <View style={styles.modelBtn}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonDelete]}
                                onPress={() => deleteUser()}
                            >
                                <Text style={styles.textStyle}>Delete</Text>
                            </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        marginTop: 22,
    },
    modalView: {
        width: "80%",
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
    buttonClose: {
        backgroundColor: "#bbbbbb",
        margin: 5,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modelBtn:{
        justifyContent: 'space-between',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    buttonDelete:{
        backgroundColor: '#fe6666',
        margin: 5,
    },
});