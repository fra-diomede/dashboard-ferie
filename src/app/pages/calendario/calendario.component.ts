import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CalendarioService } from '../../core/services/calendario.service';
import { CalendarioDto } from '../../models/calendario.model';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  year = new Date().getFullYear();
  country = 'IT';
  calendario: CalendarioDto[] = [];
  displayedColumns = ['data', 'giorno', 'festivo', 'tipo'];

  constructor(private calendarioService: CalendarioService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    const code = (this.country || '').toUpperCase();
    this.calendarioService.getCalendario(this.year, code || undefined).subscribe(data => {
      this.calendario = data || [];
    });
  }
}
