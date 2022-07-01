import { useCallback, useEffect, useState, useContext} from "react";
import { Text, ScrollView, View, TextInput, RefreshControl } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"
import BasicButton from "../components/Button";
import Cards from "../components/Cards";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";
import { LoginContext, NotesContext } from "../utils/Context";
import TagInput from "react-native-tags-input";

export default function Home() {
    const allNotesContext = useContext(NotesContext);
    const loginContext = useContext(LoginContext);
    
    const [displayNoteList, setDisplayNoteList] = useState([] as INote[]);
    const [username, setUsername] = useState("" as string);
    const [searchedTag, setSearchedTag] = useState({
        tag: "",
        tagsArray: []
    }); 
    const [searchedAuthor, setSearchedAuthor] = useState("" as string);
    const [refreshing, setRefreshing] = useState(false);
    const [nombre, setNombre] = useState(5 as number);

    const getNoteList = async () => {
        const response = await NoteService.getNote();
        allNotesContext.setAllNotes(response.reverse());
        setDisplayNoteList(response);
    };

    useEffect(() => {
        console.log(searchedTag, searchedAuthor);
        filtreNoteListByFiltre(searchedTag.tagsArray, searchedAuthor)
    }, [searchedTag, searchedAuthor]);

    const filtreNoteListByFiltre = async (textTag: string[], textAuthor: string) => {
        // Si le texte est vide on remet la liste entière
        if(!textTag && !textAuthor){
            setDisplayNoteList(allNotesContext.allNotes);
        }else{ 
            console.log("filtre");
            if(textTag.length){
                textTag.forEach(tagS => {
                    const filterList = (note: INote) => {
                        return note.tags.some(tag => tag.toLowerCase().includes(tagS.toLowerCase())) 
                        && note.author?.toLowerCase().includes(textAuthor.toLowerCase());
                    };
        
                    const listFilteredByTag = allNotesContext.allNotes.filter(filterList);
                    setDisplayNoteList(listFilteredByTag);
                });
            }else{
                console.log("!textTag");
                const filterList = (note: INote) => {
                    return note.author?.toLowerCase().includes(textAuthor.toLowerCase());
                };
    
                const listFilteredByTag = allNotesContext.allNotes.filter(filterList);
                setDisplayNoteList(listFilteredByTag);

            }
        }
    };

    useEffect(()=>{
        getNoteList();
        setUsername(loginContext.username);
    }, [loginContext.username]);

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await getNoteList()
      setRefreshing(false);
    }, []);

    const voirPlus = ()=>{
        setNombre(nombre+5);
    }

    return (
        <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
            <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: 20, margin: 10}}>
                <Text style={{fontSize: 17}}> Bienvenue </Text>
                <Text style={{fontWeight: "bold"}}>{username}</Text>
            </View>
            <View style={{ flexGrow:1, display: 'flex', alignItems:'center', justifyContent:'center', backgroundColor: "white", padding:20, margin:10, borderRadius: 10 }}>
                <Text style={{fontWeight: "bold", fontSize: 15}}>Rechercher c'est trouver</Text>
                <TextInput
                    style={{marginTop:'5%', borderColor: "gray",width: "90%",borderWidth: 0.5,borderRadius: 10,padding: 10,}}
                    onChangeText={setSearchedAuthor}
                    value={searchedAuthor}
                    placeholder="Recherche par auteurs"
                    autoCapitalize="none"
                />
                <TagInput
                    updateState={setSearchedTag}
                    tags={searchedTag}
                    placeholder="Tags de ta note"
                />
            </View>
            {
                displayNoteList.length ? displayNoteList.slice(0, nombre).map((note:INote, idx:number) =>{
                    return (
                        <Cards key={idx} note={note} getList={getNoteList}/>
                    );
                }) : null
            }
            {
                displayNoteList.length >= nombre && 
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <BasicButton style={{backgroundColor: "#57A0D2", padding: 10, margin: 10 }} onPress={() => voirPlus()}>
                        <Ionicons name="add-outline">
                            <Text>voir plus</Text>
                        </Ionicons>
                    </BasicButton> 
                </View>
            }

        </ScrollView>
    )
}