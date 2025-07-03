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

  getTipoGiorno(date: Date): string {
    // Esempio semplificato: weekend rosso, feriali verde
    if (date.getDay() === 0 || date.getDay() === 6) return 'festivo';
    // TODO: aggiungi controllo ferie, rol, permessi ecc
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
    const daysInMonth = new Date(anno, mese + 1, 0).getDate();
    const weeks = [];
    let week = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(anno, mese, day);
      week.push(date);
      if (date.getDay() === 0 || day === daysInMonth) {
        weeks.push(week);
        week = [];
      }
    }

    return weeks;
  }
}
