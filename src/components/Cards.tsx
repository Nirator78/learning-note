import { Alert, Image, Text, View } from "react-native";
import INote from "../interfaces/NoteInterface";
import Ionicons from "@expo/vector-icons/Ionicons"
import { useContext, useEffect, useState } from "react";
import { getDateFormated } from "../utils/ConverteDate";
import NoteService from "../services/NoteService";
import { useNavigation } from '@react-navigation/native';
import BasicButton from "./Button";
import { LoginContext } from "../utils/Context";

export default function Cards({note, getList} : {note: INote, getList: Function}) {
    const [date, setDate] = useState(note.creation_date as any);
    const loginContext = useContext(LoginContext);
    const [username, setUsername] = useState("" as string);
    const navigation = useNavigation();

    useEffect(() => {
       const date = getDateFormated(note.creation_date);
       setDate(date);
       setUsername(loginContext.username);
    }, [loginContext.username]);

    // Alerte a la suppresion d'une note
    const createTwoButtonAlert = (id : string) =>
        // Texte afficher 
        Alert.alert(
        "Suppresion",
        "Voulez-vous vraiment supprimer la note ?",
        [
            // Bouton annuler
            {
            text: "Annuler",
            onPress: () => console.log("Suppresion annuler"),
            style: "cancel"
            },
            // Bouton valider qui valide la suppression
            { text: "Valider", onPress: () => deleteNote(id) }
        ]
    );

    // Suppression
    const deleteNote = async (id : string) => {
        await NoteService.deleteNote(id);
        getList();
    };

    // Navigation vers le detail de la note
    const goToDetail = () => {
        navigation.navigate("Detail", {note: note});
    };

    return (
        <View style={{ backgroundColor: "white", marginHorizontal: 20, marginVertical: 5, padding:10, borderRadius: 10 }}>           
            {
                username === note.author ? (
                <View style={{justifyContent: "flex-end", alignItems: "flex-end",}}>
                    <BasicButton onPress={() => createTwoButtonAlert(note._id)}>
                        <Ionicons style={{ marginEnd:-20 }} size={20} name="close-outline"></Ionicons>
                    </BasicButton>
                </View> 
                ) : null 
            }
            <Text style={{ fontWeight: "bold", fontSize: 12, fontStyle: "italic", paddingBottom: 5}}>{date}</Text>
            <View style={{flexDirection: 'row', maxWidth: 270 }}> 
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
                <View style={{padding:10, borderRadius: 10}}>
                    <View>
                        <Text style={{ fontWeight: "bold", fontSize: 15}}>{note.title}</Text>
                        {
                            note.author ?
                            <Text style={{ fontWeight: "bold", fontSize: 12, fontStyle: "italic", paddingBottom: 5}}>Auteur : {note.author}</Text>
                            : 
                            <Text style={{ fontWeight: "bold", fontSize: 12, fontStyle: "italic", paddingBottom: 5}}>Auteur : Inconnu</Text>
                        }
                    
                        <Text>{note.text}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: "wrap" }}>
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
                <BasicButton
                    style={{borderRadius: 10, alignItems: 'center', paddingHorizontal: 32}}
                    onPress={goToDetail}
                >
                    <Ionicons size={20} style={{marginEnd:-20}} name="chevron-forward-outline"></Ionicons>
                </BasicButton>
            </View>         
        </View>
    )
}