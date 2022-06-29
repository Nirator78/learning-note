import { View, Text, TouchableOpacity } from "react-native";
import StorageService from "../services/StorageService";

export default function Profile({navigation} : {navigation: any}) {
    const deconnect = async () => {
        StorageService.removeStorage("username");
        navigation.navigate("Connexion");
    };

    return (
        <View>
            <TouchableOpacity
                style={{marginTop:'5%', backgroundColor: "#BEAF40", borderRadius: 10, alignItems: 'center', paddingHorizontal: 32, paddingVertical: 12}}
                onPress={deconnect}
            >
                <Text style={{fontSize: 12}}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    )
}