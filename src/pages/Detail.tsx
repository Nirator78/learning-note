import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detail({navigation} : {navigation: any}) {
    return (
        <View>
            <Text onPress={()=>{navigation.navigate("Home")}}>Page Detail</Text>
        </View>
    )
}