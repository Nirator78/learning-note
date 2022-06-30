import { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";
import { useForm, Controller } from "react-hook-form";
import INote from "../interfaces/NoteInterface";
import INoteForm from "../interfaces/NoteFormInterface";

export default function Forulaire({navigation, route} : {navigation: any, route: any}) {
    const [note, setNote] = useState(route?.params?.note || {} as INote)
    const { control, handleSubmit, formState: { errors } } = useForm<INoteForm>({
        defaultValues: {
            title: note.title || "",
            text: note.text || "",
            anonym: note.anonym || false,
            tags: note.tags || [],
            image: note.image || ""
        }
    });
    
    const onSubmit = (data: INoteForm) => {
        console.log(data)
        // const noteToSend: INote = {...data, };
        if(note._id) {
            console.log("modif", note);
        }else{
            console.log("creation", note);
        }
        // clean le formulaire
        // navigation.navigate("MyNotes");
    };

    return (
        <View>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={style.textBox}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="title"
                    />
                )}
                name="title"
            />
            {errors.title && <Text>This is required.</Text>}
        
            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={style.textBox}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="text"
                    />
                )}
                name="text"
            />
            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={style.textBox}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="image"
                    />
                )}
                name="image"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CheckBox
                        value={value}
                        onValueChange={onChange}
                    />
                )}
                name="anonym"
            />
            
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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