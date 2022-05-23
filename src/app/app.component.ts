import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'custom-fields';

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

}
