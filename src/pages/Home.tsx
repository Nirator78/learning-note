import { View, Text } from "react-native";

export default function Home({navigation} : {navigation: any}) {
    return (
        <View style={{paddingTop: "7%"}}>
            <Text onPress={()=>{navigation.navigate("Detail")}}>Page Home</Text>
        </View>
    )
}