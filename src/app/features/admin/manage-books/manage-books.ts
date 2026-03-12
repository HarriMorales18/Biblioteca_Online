import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { BookService } from '../../../core/services/book'
import { CoverService } from '../../../core/services/cover'



@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl:'./manage-books.html',
  styleUrl:'./manage-books.css'
})
export class ManageBooks implements OnInit{

  books:any[]=[]

  covers:any={}
  successMessage = ''

  titulo=''
  autor=''
  isbn=''
  editorial=''
  anioPublicacion=''
  categoria=''
  copiasTotales=0
  copiasDisponibles=0

  selectedFile!:File

  constructor(
    private bookService:BookService,
    private coverService:CoverService
  ){}

  ngOnInit(){

    this.loadBooks()

  }

  loadBooks(){

    this.bookService.getBooks().subscribe((res:any)=>{

      this.books = res.data

      this.books.forEach((book:any)=>{

        this.coverService.getCover(book.id).then((img)=>{

          this.covers[book.id] = img

        })

      })

    })

  }

  onFileSelected(event:any){

    const file = event.target.files[0]

    if(file){

      this.selectedFile = file

    }

  }

  createBook(){

      this.successMessage = ''

      const book = {

      titulo: this.titulo,
      autor: this.autor,
      isbn: this.isbn,
      editorial: this.editorial,
      anioPublicacion: Number(this.anioPublicacion),
      categoria: this.categoria,
      copiasTotales: Number(this.copiasTotales),
      copiasDisponibles: Number(this.copiasDisponibles)

      }

      this.bookService.createBook(book).subscribe({

      next:(res:any)=>{

      const newBook = res.data

      if(this.selectedFile){

      this.coverService.saveCover(newBook.id, this.selectedFile)

      }

      if(this.copiasDisponibles > this.copiasTotales){

      alert("Las copias disponibles no pueden ser mayores a las totales")
      return

      }

      

      this.clearForm()
      this.loadBooks()
  this.successMessage = 'Libro creado correctamente'

},

      error:(err)=>{

  this.successMessage = ''
      console.log("Error backend:", err.error)

  }

})

}

  deleteBook(id:string){

    this.bookService.deleteBook(id).subscribe(()=>{

      this.loadBooks()

    })

  }

  clearForm(){

    this.titulo=''
    this.autor=''
    this.isbn=''
    this.editorial=''
    this.anioPublicacion=''
    this.categoria=''
    this.copiasTotales=0
    this.copiasDisponibles=0
    this.selectedFile=null as any

  }

}