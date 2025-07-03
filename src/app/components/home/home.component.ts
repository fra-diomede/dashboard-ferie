import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWeekend,
  startOfWeek,
  endOfWeek, getWeeksInMonth, addWeeks, addDays
} from 'date-fns';
import { it } from 'date-fns/locale';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

enum MeseFiltro {
  ANNO_INTERO = 0,
  UNO = 1,
  DUE = 2,
  TRE = 3,
  QUATTRO = 4,
  SEI = 6,
  DODICI = 12
}


function buildCalendar(filtro: MeseFiltro, oggi: Date) {
  const anno = oggi.getFullYear();
  const meseCorrente = oggi.getMonth();

  let mesiDaMostrare: number[] = [];

  switch (filtro) {
    case MeseFiltro.UNO:
      mesiDaMostrare = [meseCorrente];
      break;
    case MeseFiltro.DUE:
      mesiDaMostrare = [meseCorrente, (meseCorrente + 1) % 12];
      break;
    case MeseFiltro.TRE: {
      const trimestre = Math.floor(meseCorrente / 3);
      mesiDaMostrare = Array.from({ length: 3 }, (_, i) => (trimestre * 3 + i) % 12);
      break;
    }
    case MeseFiltro.QUATTRO: {
      const quadrimestre = Math.floor(meseCorrente / 4);
      mesiDaMostrare = Array.from({ length: 4 }, (_, i) => (quadrimestre * 4 + i) % 12);
      break;
    }
    case MeseFiltro.SEI: {
      const semestre = Math.floor(meseCorrente / 6);
      mesiDaMostrare = Array.from({ length: 6 }, (_, i) => (semestre * 6 + i) % 12);
      break;
    }
    case MeseFiltro.DODICI: {
      mesiDaMostrare = Array.from({ length: 12 }, (_, i) => i);
      break;
    }
    case MeseFiltro.ANNO_INTERO:
    default:
      mesiDaMostrare = Array.from({ length: 12 - meseCorrente }, (_, i) => meseCorrente + i);
  }

  return mesiDaMostrare.map(mese => {
    const meseData = new Date(anno, mese, 1);
    const meseStart = startOfWeek(startOfMonth(meseData), { weekStartsOn: 1 });
    const meseEnd = endOfWeek(endOfMonth(meseData), { weekStartsOn: 1 });

    const settimane = [];
    for (let d = meseStart; d <= meseEnd; d = addDays(d, 7)) {
      settimane.push(eachDayOfInterval({ start: d, end: addDays(d, 6) }));
    }

    return {
      monthName: format(meseData, 'LLLL yyyy', { locale: it }),
      weeks: settimane
    };
  });
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatCardModule, MatGridListModule, MatFormField, MatLabel, MatOption, MatSelect, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  filtro = signal<MeseFiltro>(MeseFiltro.ANNO_INTERO);
  oggi = new Date();
  calendars = computed(() => buildCalendar(this.filtro(), this.oggi));


  giorni = computed(() => {
    const fine = addMonths(this.oggi, this.filtro());
    const days = eachDayOfInterval({
      start: startOfMonth(this.oggi),
      end: endOfMonth(fine)
    });
    return days;
  });

  cambiaFiltro(mesi: number) {
    this.filtro.set(mesi);
  }

  // placeholder: da sostituire con logica ferie reali
  getTipoGiorno(date: Date): string {
    const giorno = date.getDate();
    if (isWeekend(date)) return 'festivo';
    if (giorno === 15) return 'ferie';
    if (giorno === 20) return 'permesso';
    return 'lavorativo';
  }
}
