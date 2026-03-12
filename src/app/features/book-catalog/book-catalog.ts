import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BookService } from '../../core/services/book'
import { LoanService } from '../../core/services/loan'
import { CoverService } from '../../core/services/cover'
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-book-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-catalog.html',
  styleUrl: './book-catalog.css'
})
export class BookCatalog implements OnInit {

  books:any[]=[]
  covers:{[key:string]:string}={}

  constructor(
private bookService:BookService,
private loanService:LoanService,
private coverService:CoverService,
private route:ActivatedRoute
){}

  ngOnInit(){

this.route.queryParams.subscribe(params=>{

const search=params['search']

this.loadBooks(search)

})

}

  loadBooks(search?:string){

this.bookService.getBooks(search).subscribe((res:any)=>{

this.books=res.data

this.books.forEach((book:any)=>{

this.loadCover(book.id)

})

})

}

  loadCover(bookId:string){

    this.coverService.getCover(bookId).then((cover:any)=>{

      if(cover){

        this.covers[bookId]=cover

      }

    })

  }

  reserveBook(book:any){

    const loan={

      bookId:book.id,
      fechaDevolucionEsperada:new Date(Date.now()+7*24*60*60*1000)

    }

    this.loanService.createLoan(loan).subscribe({

      next:()=>{

        alert("Libro reservado correctamente")

      },

      error:()=>{

        alert("No se pudo reservar")

      }

    })

  }

}