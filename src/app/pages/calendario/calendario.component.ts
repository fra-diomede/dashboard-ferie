import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CalendarioService } from '../../core/services/calendario.service';
import { CalendarioDto } from '../../models/calendario.model';
import { parseItalianDate, toIsoDate, toItalianDate } from '../../core/utils/date.util';

interface DayCell {
  day: number;
  date: Date;
  dateLabel: string;
  isWeekend: boolean;
  isHoliday: boolean;
  isOfficial: boolean;
  label: string;
}

interface MonthCard {
  monthName: string;
  year: number;
  weeks: (DayCell | null)[][];
  holidays: DayCell[];
  holidayCount: number;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  year = new Date().getFullYear();
  country = 'IT';
  calendario: CalendarioDto[] = [];
  months: MonthCard[] = [];

  private readonly monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  constructor(private calendarioService: CalendarioService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    const code = (this.country || '').toUpperCase();
    this.calendarioService.getCalendario(this.year, code || undefined).subscribe(data => {
      this.calendario = data || [];
      this.months = this.buildMonths(this.calendario, this.year);
    });
  }

  private buildMonths(data: CalendarioDto[], year: number): MonthCard[] {
    const dayMap = new Map<string, CalendarioDto>();

    data.forEach(row => {
      const date = this.parseDate(row.data);
      if (!date) return;
      const iso = toIsoDate(date);
      dayMap.set(iso, row);
    });

    return this.monthNames.map((monthName, monthIndex) => {
      const weeks = this.buildWeeks(monthIndex, year, dayMap);
      const holidays: DayCell[] = [];
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, monthIndex, day);
        const cell = this.buildDayCell(date, dayMap);
        if (cell && cell.isHoliday) {
          holidays.push(cell);
        }
      }

      return {
        monthName,
        year,
        weeks,
        holidays,
        holidayCount: holidays.length
      };
    });
  }

  private buildWeeks(month: number, year: number, dayMap: Map<string, CalendarioDto>): (DayCell | null)[][] {
    const weeks: (DayCell | null)[][] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let week: (DayCell | null)[] = [];

    const firstDay = new Date(year, month, 1).getDay();
    const offset = (firstDay + 6) % 7;

    for (let i = 0; i < offset; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      week.push(this.buildDayCell(date, dayMap));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return weeks;
  }

  private buildDayCell(date: Date, dayMap: Map<string, CalendarioDto>): DayCell {
    const iso = toIsoDate(date);
    const row = dayMap.get(iso);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6 || row?.sunday === true;
    const isHoliday = !!row?.festivo || row?.officialFestivo === true;
    const label = row?.festivo?.localName || row?.festivo?.name || (row?.officialFestivo ? 'Festivo' : '');

    return {
      day: date.getDate(),
      date,
      dateLabel: toItalianDate(date),
      isWeekend,
      isHoliday,
      isOfficial: row?.officialFestivo === true,
      label
    };
  }

  private parseDate(value: string): Date | null {
    const parsed = parseItalianDate(value);
    if (parsed) return parsed.toDate();
    const raw = new Date(value);
    return Number.isNaN(raw.getTime()) ? null : raw;
  }
}
