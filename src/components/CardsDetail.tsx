import { Alert, Image, Text, View } from "react-native";
import INote from "../interfaces/NoteInterface";
import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react";
import { getDateFormated } from "../utils/ConverteDate";
import NoteService from "../services/NoteService";
import { useNavigation } from '@react-navigation/native';
import StorageService from "../services/StorageService";
import BasicButton from "./Button";

export default function CardsDetails({note} : {note: INote}) {
    const [date, setDate] = useState(note.creation_date as any);
    const [username, setUsername] = useState("" as string);
    const [noteInfo, setNoteInfo] = useState({} as INote);

    const navigation = useNavigation();

    const getUsername = async () => {
        const user = await StorageService.getStorage("username");
        setUsername(user);
    }

    useEffect(() => {
        setNoteInfo(note);
        const date = getDateFormated(note.creation_date);
        setDate(date);
        getUsername();
    }, [note]);

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
        navigation.navigate("Home");
    };

    const goToModification = () => {
        navigation.navigate("Formulaire", {note: note});
    };

    return (
        <View style={{ backgroundColor: "white", marginHorizontal: 20, marginVertical: 5, padding:10, borderRadius: 10}}>           
            {
                username === note.author ? (
                <View style={{justifyContent: "flex-end", alignItems: "flex-end",}}>
                    <BasicButton onPress={() => goToModification()}>
                        <Ionicons style={{ marginEnd:-20 }} size={20} name="create-outline"></Ionicons>
                    </BasicButton>
                </View> 
                ) : null 
            }            
            <View style={{justifyContent: "center", alignItems: "center"}}> 
                {
                    note.image ?  
                    <Image
                        source={{uri: note.image }}
                        style={{width: 60, height: 60, margin:5, borderRadius: 40}}
                    />  
                    :           
                    <Image
                        source={{uri: 'http://via.placeholder.com/60x60'}}
                        style={{width: 60, height: 60, margin:5, borderRadius: 40}}
                    />
                }
            </View>  
                <View style={{padding:10, borderRadius: 10}}>
                    <View style={{justifyContent: "center", alignItems: "center", paddingBottom:10}}>
                        <Text style={{ fontWeight: "bold", fontSize: 25}}>{note.title}</Text>
                    </View>
                    <View style={{paddingBottom:10}}>
                        <Text style={{ fontWeight: "bold", fontSize: 12, fontStyle: "italic", paddingBottom: 5}}>{date}</Text>
                        {
                            note.author ?
                            <Text style={{ fontWeight: "bold", fontSize: 12, fontStyle: "italic", paddingBottom: 5}}>Auteur : {note.author}</Text>
                            : 
                            <Text style={{ fontWeight: "bold", fontSize: 12, fontStyle: "italic", paddingBottom: 5}}>Auteur : Inconnu</Text>
                        }
                    </View>
                    <Text>{note.text}</Text>
                    <View style={{flexDirection: 'row', flexWrap: "wrap" }}>
                        {
                            note.tags?.length ? note.tags.map((tags, idx:number) =>{
                                return (
                                    <View key={idx}  style={{marginTop:10, marginRight:5, backgroundColor:"#CC8823", borderRadius:20}}>
                                        <Text style={{ margin:4}} >{tags}</Text>    
                                    </View>
                                );
                            }) : null
                        }
                    </View>
                </View>     
                {
                username === note.author ? (
                    <View style={{justifyContent: "center", alignItems: "center", paddingTop: 20}}>
                        <BasicButton style={{ backgroundColor: "#FF3C4C", padding: 10 }} onPress={() => createTwoButtonAlert(note._id)}>
                            <Text>Supprimer</Text>
                        </BasicButton>
                    </View> 
                ) : null 
                } 
        </View>
    )
}