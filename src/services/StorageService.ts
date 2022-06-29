import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
    /**
     * Permet de créer un modifier un object dans le localStorage
     * @param name
     * @param data 
     */
    async setStorage(name: string, data: any) {
        await AsyncStorage.setItem(name, JSON.stringify(data));
    }

    /**
     * Permet de récupérer un object du localStorage
     * @param name 
     * @returns 
     */
    async getStorage(name: string): Promise<any> {
        const storageData = await AsyncStorage.getItem(name);
        return JSON.parse(storageData as string);
    }

    /**
     * Permet de vider une clé du localStorage
     * @param name 
     */
    async removeStorage(name: string) {
        await AsyncStorage.removeItem(name);
    }

    /**
     * Permet de vider totalement le localStorage
     */
    async clearStorage() {
        await AsyncStorage.clear();
    }
}

export default new StorageService();