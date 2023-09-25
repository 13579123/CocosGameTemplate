export class StorageData {

    public readonly data: any

    public readonly time: number

    constructor(data: any , time: number = -1) {
        this.data = data
        if (time === -1) { 
            this.time = -1
            return
        }
        this.time = Date.now() + time
    }

    public static isAvialidData(storageData: StorageData): boolean {
        if (Date.now() > storageData.time) return false
        return true
    }

}