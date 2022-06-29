import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Connexion({navigation} : {navigation: any}) {
    return (
        <SafeAreaView>
            <Text onPress={()=>{navigation.navigate("BottomTabNavigation")}}>Page Connexion</Text>
        </SafeAreaView>
    )
}