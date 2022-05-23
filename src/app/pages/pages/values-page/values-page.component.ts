import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-values-page',
  templateUrl: './values-page.component.html',
  styleUrls: ['./values-page.component.scss']
})
export class ValuesPageComponent implements OnInit {

  public savedFields!: any;
  public data: any;

  constructor() { }

  ngOnInit(): void {
    const savedFields = localStorage.getItem('fields');
    if (savedFields) {
      this.data = JSON.parse(savedFields);
    }
  }

}
