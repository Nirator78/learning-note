import { Image, Text, View } from "react-native";
import INote from "../interfaces/NoteInterface";

export default function Cards({note} : {note: INote}) {
    return (
        <View style={{backgroundColor: "white", marginHorizontal: 20, marginVertical: 5, padding:10, borderRadius: 10}}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    source={{uri: 'http://via.placeholder.com/60x60'}}
                    style={{width: 60, height: 60, margin:5, borderRadius: 40}}
                />
                <View style={{padding:10, borderRadius: 10}}>
                <Text style={{ fontWeight: "bold", fontSize: 15}}>{note.title}</Text>
                <Text>{note.text}</Text>
                </View>
            </View>
        </View>
    )
}