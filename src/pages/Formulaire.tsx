import { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import INote from "../interfaces/NoteInterface";
import TagInput from "react-native-tags-input";
import StorageService from "../services/StorageService";
import NoteService from "../services/NoteService";

export default function Forulaire({navigation, route} : {navigation: any, route: any}) {
    const [note, setNote] = useState(route?.params?.note || {} as INote);
    const [tags, setTags] = useState({
        tag: "",
        tagsArray: note.tags || []
      })  

    const updateTagState = (update: any) => {
        setTags(update);
    };

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
        // const noteToSend: INote = {...data, };
        const username = await StorageService.getStorage("username");
        note.author = username;
        if(note.anonym){
            delete note.author;
        }

        // On ajoute les tags
        note.tags = tags.tagsArray;

        if(note._id) {
            console.log("modif", note);
            await NoteService.updateNote(note._id, note)
        }else{
            console.log("creation", note);
            await NoteService.createNote(note)
        }
        // clean le formulaire
        setNote({});
        setTags({tag: "", tagsArray: []});
        navigation.navigate("MyNotes");
    };

    return (
        <View>
            <TextInput
                style={{marginTop:'5%', justifyContent: "center", borderColor: "gray",width: "90%",borderWidth: 0.5, borderRadius: 10, padding: 10}}
                onChangeText={setTitle}
                value={note.title}
                placeholder={"title"}
            />
            <TextInput
                style={{marginTop:'5%', justifyContent: "center", borderColor: "gray",width: "90%",borderWidth: 0.5, borderRadius: 10, padding: 10}}
                onChangeText={setText}
                value={note.text}
                placeholder={"text"}
            />
            <TextInput
                style={{marginTop:'5%', justifyContent: "center", borderColor: "gray",width: "90%",borderWidth: 0.5, borderRadius: 10, padding: 10}}
                onChangeText={setImage}
                value={note.image}
                placeholder={"image"}
            />
            <View style={style.textBox}>
                <TagInput
                    updateState={updateTagState}
                    tags={tags}
                    placeholder="Tags de ta note"
                />
            </View>
            <View>
                <CheckBox
                    value={note.anonym}
                    onValueChange={setAnonym}
                />
                <Text>Anonyme</Text>
            </View>
            <TouchableOpacity
                style={{marginTop:'5%', backgroundColor: "#57A0D2", borderRadius: 10, alignItems: 'center', paddingHorizontal: 32, paddingVertical: 12}}
                onPress={onSubmit}
            >
                <Text style={{fontSize: 12}}>Créer</Text>
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