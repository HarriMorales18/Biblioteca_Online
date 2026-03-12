import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private api = 'http://localhost:8080/api/loans'

  constructor(private http:HttpClient){}

  getMyLoans(){

    return this.http.get(`${this.api}/my-loans`)

  }

  createLoan(data:any){

    return this.http.post(this.api, data)

  }

  returnLoan(id:string){

    return this.http.post(`${this.api}/${id}/return`, {})

  }

  getAllLoans(){

  return this.http.get('http://localhost:8080/api/loans')

}

}