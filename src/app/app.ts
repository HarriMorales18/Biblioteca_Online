import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './layout/header/header';
import { FooterComponent } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header , FooterComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bibliotecaFrontend');
  constructor(private router: Router) {}

  isHome(){
    return this.router.url === '/'
  }
}
