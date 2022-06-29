import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StorageService from "../services/StorageService";

export default function Profile({navigation} : {navigation: any}) {
    const [username, setUserName] = useState("");

    const deconnect = async () => {
        StorageService.removeStorage("username");
        navigation.navigate("Connexion");
    };
    const getUser = async () => {
        const username = await StorageService.getStorage("username");
        setUserName(username);
    };

    useEffect(()=>{
        getUser();
    }, []);

    return (
        <View style={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', backgroundColor: "white", padding:30, margin: 20, borderRadius: 10}}>
            <Image
                source={{uri: 'http://via.placeholder.com/60x60'}}
                style={{width: 60, height: 60, margin:5, borderRadius: 40}}
            />
            <Text>{username}</Text>
            <TouchableOpacity
                style={{marginTop:'5%', backgroundColor: "#BEAF40", borderRadius: 10, alignItems: 'center', paddingHorizontal: 32, paddingVertical: 12}}
                onPress={deconnect}
            >
            <Text style={{fontSize: 12}}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    )
}