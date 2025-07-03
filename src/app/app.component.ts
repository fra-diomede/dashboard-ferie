import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule, NavbarComponent, HomeComponent]
})
export class AppComponent {}
