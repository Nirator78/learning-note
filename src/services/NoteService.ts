import axios from "axios";
import INote from "../interfaces/NoteInterface";

const api = axios.create({baseURL: "https://m66nqp6pe8.eu-west-1.awsapprunner.com", headers:{}});

class NoteService {
    async getNote(): Promise<INote[]> {
        const response = await api.get("/note");
        return await response.data;
    }

    async getOneNote(id: string): Promise<INote[]> {
        const response = await api.get(`/note/${id}`);
        return await response.data;
    }

    async createNote(payload: INote): Promise<INote[]> {
        const response = await api.post("/note", payload);
        return await response.data;
    }

    async updateNote(id: string, payload: INote): Promise<INote[]> {
        const response = await api.put(`/note/${id}`, payload);
        return await response.data;
    }

    async deleteNote(id: string) {
        const response = await api.delete(`/note/${id}`);
        return await response.data;
    }
}

export default new NoteService();