import { useCallback, useEffect, useState, useContext} from "react";
import { Text, ScrollView, View, TextInput, RefreshControl } from "react-native";
import BasicButton from "../components/Button";
import Cards from "../components/Cards";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";
import StorageService from "../services/StorageService";
import { NotesContext } from "../utils/Context";

export default function Home() {
    const allNotesContext = useContext(NotesContext);
    
    const [displayNoteList, setDisplayNoteList] = useState([] as INote[]);
    const [username, setUserName] = useState("");
    const [searchedTag, setSearchedTag] = useState("" as string);
    const [refreshing, setRefreshing] = useState(false);
    const [nombre, setNombre] = useState(5 as number);

    const setDynamicTitle = async () => {
        const username = await StorageService.getStorage("username");
        setUserName(username);
    };

    const getNoteList = async () => {
        const response = await NoteService.getNote();
        allNotesContext.setAllNotes(response.reverse());
        setDisplayNoteList(response);
    };

    const filtreNoteListByTag = async (text: string) => {
        setSearchedTag(text);
        // Si le texte est vide on remet la liste entière
        if(!text){
            setDisplayNoteList(allNotesContext.allNotes);
        }else{
            const filterList = (note: INote) => {
                return note.tags.some(tag => tag.toLowerCase() === text.toLowerCase()) || note.author?.toLowerCase() === text.toLowerCase();
            }; 

            const listFilteredByTag = allNotesContext.allNotes.filter(filterList);
            setDisplayNoteList(listFilteredByTag);
        }
    };

    useEffect(()=>{
        getNoteList();
        setDynamicTitle();
    }, []);

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
                    onChangeText={(text) => filtreNoteListByTag(text)}
                    value={searchedTag}
                    placeholder="Recherche par tags"
                    autoCapitalize="none"
                />
            </View>
            {
                displayNoteList.length ? displayNoteList.slice(0, nombre).map((note:INote, idx:number) =>{
                    return (
                        <Cards key={idx} note={note} getList={getNoteList}/>
                    );
                }) : null
            }
            <View style={{alignItems:'center', justifyContent:'center'}}>
            <BasicButton style={{backgroundColor: "#57A0D2", padding: 10, margin: 10 }} onPress={() => voirPlus()}>
               <Text>Voir plus</Text>
            </BasicButton> 
            </View>

        </ScrollView>
    )
}