import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private api = 'http://localhost:8080/api/books'

  constructor(private http: HttpClient) {}

  /* ==============================
     Obtener todos los libros
  ============================== */

  getBooks(search?: string): Observable<any> {

    if (search) {
      return this.http.get(`${this.api}?search=${search}`)
    }

    return this.http.get(this.api)

  }

  /* ==============================
     Obtener libro por ID
  ============================== */

  getBookById(id: string): Observable<any> {

    return this.http.get(`${this.api}/${id}`)

  }

  /* ==============================
     Crear libro
  ============================== */

  createBook(book: any): Observable<any> {

    return this.http.post(this.api, book)

  }

  /* ==============================
     Actualizar libro
  ============================== */

  updateBook(id: string, book: any): Observable<any> {

    return this.http.put(`${this.api}/${id}`, book)

  }

  /* ==============================
     Eliminar libro
  ============================== */

  deleteBook(id: string): Observable<any> {

    return this.http.delete(`${this.api}/${id}`)

  }

}