import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import INote from "../interfaces/NoteInterface";
import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react";
import { getDateFormated } from "../utils/ConverteDate";
import NoteService from "../services/NoteService";
import { useNavigation } from '@react-navigation/native';
import StorageService from "../services/StorageService";

export default function Cards({note, getList} : {note: INote, getList: Function}) {
    const [date, setDate] = useState(note.creation_date as any);
    const [username, setUsername] = useState("" as string);
    const navigation = useNavigation();

    const getUsername = async () => {
        const user = await StorageService.getStorage("username");
        setUsername(user);
    }

    useEffect(() => {
       const date = getDateFormated(note.creation_date);
       setDate(date);
       getUsername();
    }, []);

    const createTwoButtonAlert = (id : string) =>
    Alert.alert(
      "Suppresion",
      "Voulez-vous vraiment supprimer la note ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Suppresion annuler"),
          style: "cancel"
        },
        { text: "Valider", onPress: () => deleteNote(id) }
      ]
    );

    const deleteNote = async (id : string) => {
        await NoteService.deleteNote(id);
        getList();
    };

    const goToDetail = () => {
        console.log("goToDetail");
        navigation.navigate("Detail", {id: note._id});
    };

    return (
        <View style={{backgroundColor: "white", marginHorizontal: 20, marginVertical: 5, padding:10, borderRadius: 10}}>           
            {
                username === note.author ? (
                <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                    <Ionicons onPress={() => createTwoButtonAlert(note._id)} size={15} name="close-outline"></Ionicons>
                </View> 
                ) : null 
            }
            <Text style={{ fontWeight: "bold", fontSize: 12, fontStyle: "italic", paddingBottom: 5}}>{date}</Text>
            <View style={{flexDirection: 'row'}}>
                <Image
                    source={{uri: 'http://via.placeholder.com/60x60'}}
                    style={{width: 60, height: 60, margin:5, borderRadius: 40}}
                />
                <View style={{padding:10, borderRadius: 10}}>
                    <Text style={{ fontWeight: "bold", fontSize: 15}}>{note.title}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 12, fontStyle: "italic", paddingBottom: 5}}>{note.author}</Text>
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
            {
                username === note.author ? (
                    <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                        <TouchableOpacity
                            style={{marginTop:'5%', backgroundColor: "#57A0D2", borderRadius: 10, alignItems: 'center', paddingHorizontal: 32, paddingVertical: 12}}
                            onPress={goToDetail}
                        >
                            <Ionicons size={20} name="chevron-forward-outline"></Ionicons>
                        </TouchableOpacity>
                    </View>  
                ) : null
            }            
        </View>
    )
}