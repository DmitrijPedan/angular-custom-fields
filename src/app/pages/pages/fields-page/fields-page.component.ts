import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fields-page',
  templateUrl: './fields-page.component.html',
  styleUrls: ['./fields-page.component.scss']
})
export class FieldsPageComponent implements OnInit {

  public data: any;

  public savedFields!: any;
  public submitCustomFieldsForm(data: any): void {
    localStorage.setItem('fields', JSON.stringify(data));
    alert('Data saved to local storage');
  }

  ngOnInit(): void {
    const savedFields = localStorage.getItem('fields');
    if (savedFields) {
      this.savedFields = JSON.parse(savedFields);
    }
  }

  buildFormFromData(): void {
    this.data = {...this.savedFields};
  }

}
