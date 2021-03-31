import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-submitted-data',
  templateUrl: './submitted-data.component.html',
  styleUrls: ['./submitted-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmittedDataComponent implements OnInit {

  @Input() data: {name: string; email: string; phone_number: string} = undefined;

  constructor() { }

  ngOnInit() {
  }
}
