import { useContext, useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import INote from "../interfaces/NoteInterface";
import TagInput from "react-native-tags-input";
import NoteService from "../services/NoteService";
import { LoginContext } from "../utils/Context";

export default function Forulaire({navigation, route} : {navigation: any, route: any}) {
    const loginContext = useContext(LoginContext);
    const [note, setNote] = useState(route?.params?.note || {anonym: false} as INote);
    const [tags, setTags] = useState({
        tag: "",
        tagsArray: note.tags || []
    });

    const setTitle = (title: string) => {
        setNote({...note, title});
    };

    const setText = (text: string) => {
        setNote({...note, text});
    };

    const setImage = (image: string) => {
        setNote({...note, image});
    };

    const setAnonym = (anonym: boolean) => {
        setNote({...note, anonym});
    };
    
    const onSubmit = async () => {
        // Si anonym à true on vire l'utilisateur courant de l'envoie
        note.author = loginContext.username;
        if(note.anonym){
            delete note.author;
        }

        // On ajoute les tags
        note.tags = tags.tagsArray;

        if(note._id) {
            await NoteService.updateNote(note._id, note)
        }else{
            await NoteService.createNote(note)
        }
        // clean le formulaire
        setNote({});
        setTags({tag: "", tagsArray: []});
        navigation.navigate("MyNotes");
    };

    return (
        <View style={{ display: 'flex', backgroundColor: "white", padding:30, margin: 20, borderRadius: 10 }} >
            <View style={{ flexGrow:1, display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                {
                    note._id ?
                    <Text style={{fontSize: 17}}> Modification de votre note </Text>
                    :
                    <Text style={{fontSize: 17}}> Création de votre note </Text>
                }
                <TextInput
                    style={{marginTop:'5%', justifyContent: "center", borderColor: "gray",width: "90%",borderWidth: 0.5, borderRadius: 10, padding: 10}}
                    onChangeText={setTitle}
                    value={note.title}
                    placeholder={"Titre"}
                />
                <TextInput
                    style={{marginTop:'5%', justifyContent: "center", borderColor: "gray",width: "90%",borderWidth: 0.5, borderRadius: 10, padding: 10}}
                    onChangeText={setText}
                    value={note.text}
                    placeholder={"Le texte"}
                />
                <TextInput
                    style={{marginTop:'5%', justifyContent: "center", borderColor: "gray",width: "90%",borderWidth: 0.5, borderRadius: 10, padding: 10}}
                    onChangeText={setImage}
                    value={note.image}
                    placeholder={"Image"}
                />
                <View style={style.textBox}>
                    <TagInput
                        updateState={setTags}
                        tags={tags}
                        placeholder="Tags de ta note"
                    />
                </View>
            </View>
            <View style={{flexGrow:1, display: 'flex', flexDirection: 'row', alignItems:'flex-start', justifyContent:'flex-start', padding:10}}>
                <CheckBox
                    value={note.anonym}
                    onValueChange={setAnonym}   
                    style={{marginRight: 10}}
                />
                <Text>Anonyme</Text>
            </View>
            <TouchableOpacity
                style={{marginTop:'5%', backgroundColor: "#57A0D2", borderRadius: 10, alignItems: 'center', paddingHorizontal: 32, paddingVertical: 12}}
                onPress={onSubmit}
            >
                {
                    note._id ?
                        <Text style={{fontSize: 12}}>Modifier</Text>
                    :
                        <Text style={{fontSize: 12}}>Créer</Text>
                }
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    textBox:{
        marginTop:'5%', 
        justifyContent: "center", 
        borderColor: "gray",
        width: "90%",
        borderWidth: 0.5, 
        borderRadius: 10, 
        padding: 10
    }
});