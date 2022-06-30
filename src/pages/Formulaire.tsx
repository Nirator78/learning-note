import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import INote from "../interfaces/NoteInterface";

export default function Forulaire({navigation, route} : {navigation: any, route: any}) {
    const [note, setNote] = useState(route?.params?.note || {} as INote)

    useEffect(() => {
        console.log("note", note);
        if(note._id) {
            console.log("modif", note);
        }else{
            console.log("creation", note);
        }
    }, []);

    return (
        <View>
            <Text onPress={()=>{navigation.navigate("Home")}}>Page Formulaire</Text>
        </View>
    )
}