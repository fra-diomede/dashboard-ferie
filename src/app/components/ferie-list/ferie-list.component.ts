import { Component, OnInit } from '@angular/core';
import { FerieService } from '../../services/ferie.service';

@Component({
  selector: 'app-ferie-list',
  templateUrl: './ferie-list.component.html'
})
export class FerieListComponent implements OnInit {
  ferie: any[] = [];

  constructor(private ferieService: FerieService) {}

  ngOnInit() {
    this.ferieService.getFerie().subscribe(data => this.ferie = data);
  }
}
