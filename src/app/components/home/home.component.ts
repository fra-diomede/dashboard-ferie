import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroMesiComponent, MeseFiltro } from '../ferie-filtri/ferie-filtri.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FiltroMesiComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  filtro = signal<MeseFiltro>(MeseFiltro.ANNO_INTERO);
  oggi = new Date();

  calendars = computed(() => this.buildCalendar(this.filtro(), this.oggi));

  cambiaFiltro(val: MeseFiltro) {
    this.filtro.set(val);
  }

  getTipoGiorno(date: Date | null): string {
    if (!date) return 'vuoto';
    const giorno = date.getDay();
    if (giorno === 0 || giorno === 6) return 'festivo'; // domenica o sabato
    return 'lavorativo';
  }


  private buildCalendar(filtro: MeseFiltro, oggi: Date) {
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
      case MeseFiltro.DODICI:
        mesiDaMostrare = Array.from({ length: 12 }, (_, i) => i);
        break;
      case MeseFiltro.ANNO_INTERO:
      default:
        mesiDaMostrare = Array.from({ length: 12 - meseCorrente }, (_, i) => meseCorrente + i);
        break;
    }

    const monthsNames = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];

    return mesiDaMostrare.map(meseIndex => ({
      monthName: monthsNames[meseIndex],
      year: oggi.getFullYear(),
      weeks: this.buildWeeks(meseIndex, oggi.getFullYear())
    }));
  }

  private buildWeeks(mese: number, anno: number) {
    const weeks: (Date | null)[][] = [];
    const daysInMonth = new Date(anno, mese + 1, 0).getDate();
    let week: (Date | null)[] = [];

    // Giorno della settimana del 1° del mese (0=Dom, 1=Lun, ..., 6=Sab)
    const firstDay = new Date(anno, mese, 1).getDay();
    const offset = (firstDay + 6) % 7; // Converte da domenica-inizio a lunedì-inizio

    // Aggiunge i placeholder (null) per i giorni prima del 1 del mese
    for (let i = 0; i < offset; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(new Date(anno, mese, day));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      // Completa l'ultima settimana con altri placeholder se necessario
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return weeks;
  }

}
