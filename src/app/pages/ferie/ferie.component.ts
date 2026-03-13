import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FerieService } from '../../core/services/ferie.service';
import { TipologicaService } from '../../core/services/tipologica.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { FerieDto, TipoFerie } from '../../models/ferie.model';
import { TipoFerieDto, TipoStatoFerieDto } from '../../models/tipologica.model';
import { parseItalianDate, toItalianDate } from '../../core/utils/date.util';

@Component({
  selector: 'app-ferie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './ferie.component.html',
  styleUrls: ['./ferie.component.scss']
})
export class FerieComponent implements OnInit {
  ferie: FerieDto[] = [];
  filtered: FerieDto[] = [];
  tipi: TipoFerieDto[] = [];
  stati: TipoStatoFerieDto[] = [];
  selectedStatus = 'ALL';
  year = new Date().getFullYear();
  editingId?: number | null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ferieService: FerieService,
    private tipologicaService: TipologicaService,
    private authService: AuthService,
    private notifications: NotificationService
  ) {
    this.form = this.fb.group({
      dataInizio: [null as Date | null, Validators.required],
      dataFine: [null as Date | null, Validators.required],
      tipoFerieId: [null as number | null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadTipologiche();
    this.loadFerie();
  }

  loadTipologiche() {
    this.tipologicaService.getTipoFerie().subscribe(data => (this.tipi = data));
    this.tipologicaService.getTipoStatoFerie().subscribe(data => (this.stati = data));
  }

  loadFerie() {
    const user = this.authService.getSession()?.username;
    if (!user) return;
    this.ferieService.listByMatricola(user).subscribe(data => {
      this.ferie = data || [];
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filtered = this.ferie.filter(item => {
      const status = item.tipoStatoFerie?.descrizione ?? '';
      const matchStatus = this.selectedStatus === 'ALL' || status === this.selectedStatus;
      const dateParsed = parseItalianDate(item.dataInizio);
      const matchYear = dateParsed ? dateParsed.year() === this.year : true;
      return matchStatus && matchYear;
    });
  }

  select(item: FerieDto) {
    this.editingId = item.id ?? null;
    const start = parseItalianDate(item.dataInizio)?.toDate() ?? null;
    const end = parseItalianDate(item.dataFine)?.toDate() ?? null;
    this.form.patchValue({
      dataInizio: start,
      dataFine: end,
      tipoFerieId: item.tipoFerie?.id ?? null
    });
  }

  resetForm() {
    this.editingId = null;
    this.form.reset();
  }

  submit() {
    if (this.form.invalid) return;
    const user = this.authService.getSession()?.username;
    if (!user) return;

    const tipo = this.tipi.find(t => t.id === this.form.value.tipoFerieId) as TipoFerieDto | undefined;
    if (!tipo) return;

    const payload: FerieDto = {
      matricola: user,
      dataInizio: toItalianDate(this.form.value.dataInizio as Date),
      dataFine: toItalianDate(this.form.value.dataFine as Date),
      tipoFerie: tipo as TipoFerie
    };

    const req = this.editingId
      ? this.ferieService.update(this.editingId, payload)
      : this.ferieService.create(payload);

    req.subscribe({
      next: () => {
        this.notifications.success(this.editingId ? 'Ferie aggiornate' : 'Ferie inserite');
        this.resetForm();
        this.loadFerie();
      }
    });
  }

  remove(item: FerieDto) {
    if (!item.id) return;
    this.ferieService.delete(item.id).subscribe({
      next: () => {
        this.notifications.success('Ferie eliminate');
        this.loadFerie();
      }
    });
  }
}
