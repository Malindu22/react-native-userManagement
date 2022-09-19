import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Modal, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toast, { Toaster } from 'react-hot-toast';
import AuthContext from './AuthContext';

export default function HomePage({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [isloading, loading] = useState(true);
    const [deleteUserId, setDeleteUserId] = useState("");
    const [token, setToken] = useState("");

    const { isAuth, setAuth } = React.useContext(AuthContext);

    const getUserData = async (tokendata) => {
        if (tokendata == '') return;
        loading(true)
        await fetch(global.MainUrl + '/api/view', {
            method: 'GET',
            headers: { 'x-access-token': tokendata },
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.status) {
                setData(responseJson.data)
            }
            console.log(responseJson)
        }).catch((error) => {
            console.error(error);
        }).finally(() => loading(false))
    };

    const deleteUser = async () => {
        await fetch(global.MainUrl + '/api/delete/' + deleteUserId, {
            method: 'DELETE',
            headers: { 'x-access-token': token },
        }).then((response) => response.json()).then((responseJson) => {
            // console.log(responseJson)
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
        }).finally(() => { loading(false); setModalVisible(!modalVisible); getUserData() })
    }

    const getToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await AsyncStorage.getItem("TOKEN");
                console.log("token", value)
                if (value !== null) {
                    setToken(value)
                }
                return resolve({ val: value });
            } catch (e) {
                console.log("get token err")
                return reject({ err: e });
            }
        })
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (token != '') {
                getUserData(token);
            } else {
                getToken().then(succ => {
                    getUserData(succ.val);
                }).catch(err => { console.log(err); })
            }
        });
        return unsubscribe;
    }, [navigation, token]);


    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button color="#fb2525" style={{ margin: 5}} onPress={() => logOut()} title="Logout" />
          ),
        });
      }, [navigation]);

      const logOut = async() =>{
        try {
            await AsyncStorage.removeItem('TOKEN')
          } catch(e) {
            // remove error
            console.log("Log out error");
          }
        setToken('');
        setAuth(false);
      }
    // useEffect(() => {
    //     getToken();
    //     getUserData();
    // }, [token]);

    // useEffect(() => {
    //     getUserData();
    // }, [navigation]);

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
                                        <Ionicons onPress={() => { setModalVisible(true); setDeleteUserId(d._id) }} style={styles.deleteBtn} name="md-trash-bin" size={16} color="#fff" />
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
    modelBtn: {
        justifyContent: 'space-between',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    buttonDelete: {
        backgroundColor: '#fe6666',
        margin: 5,
    },
});