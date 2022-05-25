import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-values-page',
  templateUrl: './values-page.component.html',
  styleUrls: ['./values-page.component.scss']
})
export class ValuesPageComponent implements OnInit {

  public savedFields!: any;
  public savedValues: any;

  constructor() { }

  ngOnInit(): void {
    const savedFields = localStorage.getItem('fields');
    if (savedFields) {
      this.savedFields = JSON.parse(savedFields);
    }
    const savedValues = localStorage.getItem('values');
    if (savedValues) {
      this.savedValues = JSON.parse(savedValues);
    }
  }

  saveValues(values: any): void {
    localStorage.setItem('values', JSON.stringify(values));
    alert('Values saved to local storage');
  }

}
