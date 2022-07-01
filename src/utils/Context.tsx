import { createContext } from "react";
import INote from "../interfaces/NoteInterface";

/**
 * Context React pour récupérer le username
 */
export const LoginContext = createContext(
    {} as {
        username: string;
        setUsername: React.Dispatch<React.SetStateAction<string>>;
    } 
);

/**
 * Context React pour récupérer la liste des notes
 */
export const NotesContext = createContext(
    {} as {
        allNotes: INote[];
        setAllNotes: React.Dispatch<React.SetStateAction<INote[]>>;
    }
);