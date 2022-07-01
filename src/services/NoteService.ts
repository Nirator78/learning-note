import axios from "axios";
import INote from "../interfaces/NoteInterface";

const api = axios.create({baseURL: "https://m66nqp6pe8.eu-west-1.awsapprunner.com", headers:{}});

class NoteService {
    /**
     * Retourne la liste de toutes les notes
     * @returns INote[]
     */
    async getNote(): Promise<INote[]> {
        const response = await api.get("/note");
        return await response.data;
    }
    
    /**
     * Permet de créer une note
     * @param payload 
     * @returns INote
     */
    async createNote(payload: INote): Promise<INote[]> {
        const response = await api.post("/note", payload);
        return await response.data;
    }

    /**
     * Permet de modifier une note
     * @param id 
     * @param payload 
     * @returns INote
     */
    async updateNote(id: string, payload: INote): Promise<INote[]> {
        const response = await api.put(`/note/${id}`, payload);
        return await response.data;
    }

    /**
     * Permet de delete une note
     * @param id 
     * @returns 
     */
    async deleteNote(id: string) {
        const response = await api.delete(`/note/${id}`);
        return await response.data;
    }
}

export default new NoteService();