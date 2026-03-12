import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ManageBooks} from './features/admin/manage-books/manage-books';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { BookCatalog } from './features/book-catalog/book-catalog';
import { MyLoans } from './features/my-loans/my-loans';
import { AdminLoans } from './features/admin-loans/admin-loans';
import { MyReservations } from './features/my-reservations/my-reservations';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'admin/books',
        component: ManageBooks

    },

    {path: 'login',
        component: LoginComponent
    },

    {path: 'register',
        component: RegisterComponent
    },

    {
        path: 'manage-books',
        component: ManageBooks
    },

    {
        path: 'catalog',
        component: BookCatalog
    },

    {
        path: 'dashboard',
        component: BookCatalog
    },

    {
        path: 'book-catalog',
        component: BookCatalog
    },

    {
        path: 'my-loans',
        component: MyLoans
    },

    {
        path:'admin-loans',
        component:AdminLoans
    },

    {
        path:'my-reservations',
        component:MyReservations
    },

    {
        path: '**',
        redirectTo: ''
    }
];
