import { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, StyleSheet, ScrollView, Text, View } from "react-native";
import BasicButton from "../components/Button";
import Cards from "../components/Cards";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";
import { LoginContext, NotesContext } from "../utils/Context";
import TagInput from "react-native-tags-input";

export default function MyNotes() {
    const allNotesContext = useContext(NotesContext);
    const loginContext = useContext(LoginContext);
    
    const [userNotesList, setUserNotesList] = useState([] as INote[]);
    const [displayNoteList, setDisplayNoteList] = useState([] as INote[]);
    const [searchedTag, setSearchedTag] = useState({
        tag: "",
        tagsArray: []
    }); 
    const [refreshing, setRefreshing] = useState(false);
    const [nombre, setNombre] = useState(5 as number);

    const getMyNoteList = async () => {
        const response = await NoteService.getNote();
        allNotesContext.setAllNotes(response.reverse());
        const listFiltered = response.filter(note => note.author === loginContext.username && !note.anonym);
        setUserNotesList(listFiltered);
        setDisplayNoteList(listFiltered);
    };

    useEffect(() => {
        filtreNoteListByFiltre(searchedTag.tagsArray)
    }, [searchedTag]);


    const filtreNoteListByFiltre = async (textTag: string[]) => {
        // Si le texte est vide on remet la liste entière
        if(!textTag){
            setDisplayNoteList(userNotesList);
        }else{ 
            textTag.forEach(tagS => {
                const filterList = (note: INote) => {
                    return note.tags.some(tag => tag.toLowerCase().includes(tagS.toLowerCase()));
                };
    
                const listFilteredByTag = userNotesList.filter(filterList);
                setDisplayNoteList(listFilteredByTag);
            });
        }
    };
    
    useEffect(()=>{
        getMyNoteList();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getMyNoteList()
        setRefreshing(false);
    }, []);

    const voirPlus = ()=>{
        setNombre(nombre+200);
    }

    return (
        <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={{ flexGrow:1, display: 'flex', alignItems:'center', justifyContent:'center', backgroundColor: "white", padding:20, margin:10, borderRadius: 10 }}>
                <Text style={{fontWeight: "bold", fontSize: 15}}>Rechercher c'est trouver</Text>
                <View style={style.textBox}>
                    <TagInput
                        updateState={setSearchedTag}
                        tags={searchedTag}
                        placeholder="Rechercher par tags"
                        style={{fontSize: 14, }}
                    />  
                </View>
            </View>

            {
                displayNoteList.length ? displayNoteList.slice(0, nombre).map((note:INote, idx:number) =>{
                    return (
                        <Cards key={idx} note={note} getList={getMyNoteList} />
                    );
                }) : null
            }
            {
                displayNoteList.length >= nombre && 
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <BasicButton style={{backgroundColor: "#57A0D2", padding: 10, margin: 10 }} onPress={() => voirPlus()}>
                        <Text>Voir plus</Text>
                    </BasicButton> 
                </View>
            }
        </ScrollView>
    )
}

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