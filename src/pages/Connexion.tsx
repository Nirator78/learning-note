import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import StorageService from "../services/StorageService";

export default function Connexion({navigation} : {navigation: any}) {
    const [username, setUsername] = useState("");

    const connect = async () => {
        if(username){
            StorageService.setStorage("username", username);
            navigation.navigate("BottomTabNavigation");
        }
    };

    const verifIfUserAlreadyConntected = async () => {
        if(await StorageService.getStorage("username"))
            navigation.navigate("BottomTabNavigation");
    };

    useEffect(()=>{
        verifIfUserAlreadyConntected();
    });

    return (
        <SafeAreaView style={{ flexGrow:1, display: 'flex', alignItems:'center', justifyContent:'center', margin: 20}}>
            <View style={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width: '100%', backgroundColor: "white", padding:30, margin: 10, borderRadius: 10}}>
                <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: 20, margin: 10}}>
                <Text style={{fontSize: 17}}> Connexion </Text>
            </View>
                <TextInput
                    style={{marginTop:'5%', justifyContent: "center", borderColor: "gray",width: "90%",borderWidth: 0.5, borderRadius: 10, padding: 10}}
                    onChangeText={setUsername}
                    value={username}
                    placeholder={"Votre login"}
                />
                <TouchableOpacity
                    style={{marginTop:'5%', backgroundColor: "#57A0D2", borderRadius: 10, alignItems: 'center', paddingHorizontal: 32, paddingVertical: 12}}
                    onPress={connect}
                >
                    <Text style={{fontSize: 12}}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
    
}

