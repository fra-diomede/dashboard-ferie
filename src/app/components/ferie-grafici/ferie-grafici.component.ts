import { Component } from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-ferie-grafici',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './ferie-grafici.component.html',
  styleUrl: './ferie-grafici.component.scss'
})
export class FerieGraficiComponent {

  public chartData = {
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
    datasets: [
      { data: [2, 4, 1, 0, 3, 2], label: 'Ferie Usate' }
    ]
  };

}
