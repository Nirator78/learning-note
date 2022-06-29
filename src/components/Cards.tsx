import { Image, Text, View } from "react-native";
import INote from "../interfaces/NoteInterface";
import Ionicons from "@expo/vector-icons/Ionicons"

export default function Cards({note} : {note: INote}) {
    return (
        <View style={{backgroundColor: "white", marginHorizontal: 20, marginVertical: 5, padding:10, borderRadius: 10}}>
            <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                <Ionicons size={15} name="close-outline"></Ionicons>
            </View>  
            <View style={{flexDirection: 'row'}}>
                <Image
                    source={{uri: 'http://via.placeholder.com/60x60'}}
                    style={{width: 60, height: 60, margin:5, borderRadius: 40}}
                />
                <View style={{padding:10, borderRadius: 10}}>
                    <Text style={{ fontWeight: "bold", fontSize: 15}}>{note.title}</Text>
                    <Text>{note.text}</Text>
                    <View style={{flexDirection: 'row'}}>
                        {
                            note.tags.length ? note.tags.map((tags, idx:number) =>{
                                return (
                                    <View key={idx}  style={{marginTop:10, marginRight:5, backgroundColor:"#CC8823", borderRadius:20}}>
                                        <Text style={{ margin:4}} >{tags}</Text>    
                                    </View>
                                );
                            }) : null
                        }
                    </View>
                </View>
            </View>
            <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                <Ionicons size={20} name="chevron-forward-outline"></Ionicons>
            </View>  
        </View>
    )
}