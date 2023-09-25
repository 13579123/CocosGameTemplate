import { error } from "cc"
import { StorageData } from "./StorageData"

function get<T>(key: string): T|null {
    try {
        const storageData: StorageData = JSON.parse(localStorage.getItem(key))
        if (!StorageData.isAvialidData(storageData)) {
            localStorage.removeItem(key)
            return null
        }
        return storageData.data
    } catch(e) {
        error(e)
        return null
    }
}

function set(key: string , data: any , time?: number) {
    const storageData: StorageData = new StorageData(data , time)
    localStorage.setItem(key , JSON.stringify(storageData))
}

export const storage = {
    get , set
}