import {AssetManager as CCAssetManager , log} from 'cc'
import { HAS_LAOD_ASSET_BUNDLE } from './cache'
import { Asset } from 'cc'

export class AssetManager {

    // 如果获取资源时没有获取到bundle则加入队列
    private loadResourceList: {path: string , type: any , resolve: (a: any) => void}[] = []

    // 如果获取资源时没有获取到bundle则加入队列
    private loadDirResourceList: {path: string , type: any , resolve: (a: any) => void}[] = []

    // cocos 本地 AssetManager 的绑定
    protected ccAssetManager: CCAssetManager.Bundle|null = null

    // 构造器
    constructor(bundleName: string = "resources") {
        // 查看是否存在缓存
        let bundle = HAS_LAOD_ASSET_BUNDLE.get(bundleName)
        if (bundle) {
            this.ccAssetManager = bundle
            return
        }
        CCAssetManager.instance.loadBundle(bundleName , (err , data) => {
            if (err) throw err
            bundle = data
            this.ccAssetManager = data;
            const onDataAssetComplete = (res: Function , err: Error|undefined , data: Asset|Asset[]) => {
                if(err) {
                    log(err)
                    return res(null)
                }
                res(data)
            }
            // 清空队列
            Array.from(this.loadResourceList).forEach(loadInfo => {
                this.ccAssetManager.load(loadInfo.path , loadInfo.type , (err , data) => {
                    this.loadResourceList.length--
                    onDataAssetComplete(loadInfo.resolve , err , data)
                })
            })
            Array.from(this.loadDirResourceList).forEach(loadInfo => {
                this.ccAssetManager.loadDir(loadInfo.path , loadInfo.type , (err , data) => {
                    this.loadDirResourceList.length--
                    onDataAssetComplete(loadInfo.resolve , err , data)
                })
            })
            // 设置缓存
            HAS_LAOD_ASSET_BUNDLE.set(bundleName , bundle)
        })
    }

    // 加载资源
    public async load<T>(path: string , type?: new (...v: any) => T): Promise<T|null> {
        return new Promise((resolve) => {
            if (this.ccAssetManager === null) {
                this.loadResourceList.push({path , type , resolve})
                return
            }
            this.ccAssetManager.load(path , type as any , (err , data) => {
                if(err) {
                    log(err)
                    resolve(null)
                    return
                }
                resolve(data as T)
            })
        })
    }

    // 加载文件夹
    public async loadDir<T>(path: string , type?: new (...v: any) => T): Promise<T[]|null> {
        return new Promise((resolve) => {
            if (this.ccAssetManager === null) {
                this.loadDirResourceList.push({path , type , resolve})
                return
            }
            this.ccAssetManager.loadDir(path , type as any , (err , data) => {
                if(err) {
                    log(err)
                    resolve(null)
                    return
                }
                resolve(data as T[])
            })
        })
    }

}