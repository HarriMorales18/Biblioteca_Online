import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private api = 'http://localhost:8080/api/reservations'

  constructor(private http: HttpClient) {}

  /* =========================
     Obtener mis reservas
  ========================= */

  getMyReservations(){

    return this.http.get(`${this.api}/my-reservations`)

  }

  /* =========================
     Crear reserva
  ========================= */

  createReservation(bookId:string){

    return this.http.post(this.api,{bookId})

  }

  /* =========================
     Cancelar reserva
  ========================= */

  cancelReservation(id:string){

    return this.http.delete(`${this.api}/${id}/cancel`)

  }

}