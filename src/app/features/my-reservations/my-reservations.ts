import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReservationService } from '../../core/services/reservation'


@Component({
  selector:'app-my-reservations',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./my-reservations.html',
  styleUrl:'./my-reservations.css'
})
export class MyReservations implements OnInit{

reservations:any[]=[]

constructor(private reservationService:ReservationService){}

ngOnInit(){

this.loadReservations()

}

loadReservations(){

this.reservationService.getMyReservations().subscribe((res:any)=>{

this.reservations=res.data

})

}

cancelReservation(id:string){

this.reservationService.cancelReservation(id).subscribe({

next:()=>{

alert("Reserva cancelada")

this.loadReservations()

},

error:()=>{

alert("No se pudo cancelar")

}

})

}

}