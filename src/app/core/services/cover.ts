import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoverService {

  private dbName = 'libraryDB'
  private storeName = 'covers'
  private db!: IDBDatabase

  constructor() {
    this.initDB()
  }

  initDB() {

    const request = indexedDB.open(this.dbName, 1)

    request.onupgradeneeded = (event:any) => {

      const db = event.target.result

      if(!db.objectStoreNames.contains(this.storeName)){

        db.createObjectStore(this.storeName)

      }

    }

    request.onsuccess = (event:any) => {

      this.db = event.target.result

    }

  }

  saveCover(bookId:string, file:File){

    const reader = new FileReader()

    reader.onload = () => {

      const transaction = this.db.transaction([this.storeName], 'readwrite')

      const store = transaction.objectStore(this.storeName)

      store.put(reader.result, bookId)

    }

    reader.readAsDataURL(file)

  }

  getCover(bookId:string):Promise<string>{

    return new Promise((resolve)=>{

      const transaction = this.db.transaction([this.storeName],'readonly')

      const store = transaction.objectStore(this.storeName)

      const request = store.get(bookId)

      request.onsuccess = () => {

        resolve(request.result)

      }

      request.onerror = () => {

        resolve('/no-cover.png')

      }

    })

  }

}