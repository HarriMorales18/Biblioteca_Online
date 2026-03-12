import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BookService } from '../../core/services/book'
import { LoanService } from '../../core/services/loan'
import { ReservationService } from '../../core/services/reservation'
import { CoverService } from '../../core/services/cover'
import { ActivatedRoute, Router } from '@angular/router'


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
    private reservationService:ReservationService,
    private coverService:CoverService,
    private route:ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){

    // Load immediately (useful when redirected programmatically)
    this.loadBooks()

    // Also react to query param changes (search)
    this.route.queryParams.subscribe(params=>{
      const search = params['search']
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

    this.reservationService.createReservation(book.id).subscribe({
      next:(res:any)=>{
        const createdReservation = res?.data || null
        // create loan immediately so it appears in My Loans without admin approval
        const loan = {
          bookId: book.id,
          fechaDevolucionEsperada: new Date(Date.now() + 7*24*60*60*1000)
        }

        this.loanService.createLoan(loan).subscribe({
          next:(loanRes:any)=>{
            const createdLoan = loanRes?.data || null
            alert('Reserva solicitada y préstamo creado')
            this.router.navigate(['/my-reservations'], { state: { newReservation: createdReservation, newLoan: createdLoan } })
          },
          error:()=>{
            // reservation ok but loan failed
            alert('Reserva creada, pero no se pudo crear el préstamo automáticamente')
            this.router.navigate(['/my-reservations'], { state: { newReservation: createdReservation } })
          }
        })

      },
      error:()=>{
        alert('No se pudo solicitar la reserva')
      }
    })

  }

  

}