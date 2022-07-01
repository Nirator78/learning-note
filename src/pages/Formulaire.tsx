import { useCallback, useContext, useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl } from "react-native";
import CheckBox from "expo-checkbox";
import * as ImagePicker from 'expo-image-picker';
import TagInput from "react-native-tags-input";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";
import { LoginContext } from "../utils/Context";
import BasicButton from "../components/Button";

export default function Formulaire({navigation, route} : {navigation: any, route: any}) {
    const loginContext = useContext(LoginContext);
    const [note, setNote] = useState(route?.params?.note || {anonym: false} as INote);
    const [tags, setTags] = useState({
        tag: "",
        tagsArray: note.tags || []
    });
    const [image, setImage] = useState(note.image || "" as string);
    const [refreshing, setRefreshing] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result: any = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1
        });
        
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    const setTitle = (title: string) => {
        setNote({...note, title});
    };

    const setText = (text: string) => {
        setNote({...note, text});
    };

    const setAnonym = (anonym: boolean) => {
        setNote({...note, anonym});
    };
    
    const onSubmit = async () => {
        // Si anonym à true on vire l'utilisateur courant de l'envoie
        note.author = loginContext.username;
        if(note.anonym){
            note.author = "";
        }

        if(image) {
            note.image = image;
        }

        // On ajoute les tags
        note.tags = tags.tagsArray; 

        // Création ou mise à jour  
        if(note._id) {
            await NoteService.updateNote(note._id, note)
        }else{
            await NoteService.createNote(note)
        }

        // clean le formulaire
        setNote({anonym: false});
        setImage(null);
        setTags({tag: "", tagsArray: []});
        navigation.navigate("MyNotes");
    };

    const onRefresh = useCallback(async () => {
        // clean le formulaire
        setRefreshing(true);
        setNote({anonym: false});
        setImage(null);
        setTags({tag: "", tagsArray: []});
        setRefreshing(false);
      }, []);

    return (
        <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
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
                        style={{marginTop:'5%', justifyContent: "center", borderColor: "gray", width: "90%",borderWidth: 0.5, borderRadius: 10, padding: 10}}
                        onChangeText={setText}
                        value={note.text}
                        placeholder={"Le texte"}
                    />
                    <View style={{display: 'flex', flexDirection: 'column', marginTop:'5%', justifyContent: "flex-start",alignItems:'flex-start', borderColor: "gray", width: "90%",borderWidth: 0.5, borderRadius: 10, paddingTop: 10, paddingBottom: 10}}>
                        
                        <BasicButton onPress={pickImage} >
                            <Text style={{color:'blue'}}>Choisir une image</Text>
                            {image ? <Image source={{ uri: image }} style={{ width: 50, height: 50 }} /> : null}
                        </BasicButton>
                    </View>
                    <View style={style.textBox}>
                        <TagInput
                            updateState={setTags}
                            tags={tags}
                            placeholder="Tags de ta note"
                            style={{fontSize: 14, }}
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
        </ScrollView>
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
        paddingTop: 10
    }
});