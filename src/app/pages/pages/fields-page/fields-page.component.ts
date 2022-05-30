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
    alert('Fields set saved to local storage');
  }

  ngOnInit(): void {
    this.getSavedFields();
  }

  getSavedFields(): void {
    const savedFields = localStorage.getItem('fields');
    if (savedFields) {
      this.savedFields = JSON.parse(savedFields);
    }
  }

  buildFormFromData(): void {
    this.getSavedFields();
    this.data = [...this.savedFields];
  }

}
