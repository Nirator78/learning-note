import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({navigation} : {navigation: any}) {
    return (
        <SafeAreaView>
            <View style={{paddingTop: "7%"}}>
                <Text onPress={()=>{navigation.navigate("Detail")}}>Page Home</Text>
            </View>
        </SafeAreaView>
    )
}