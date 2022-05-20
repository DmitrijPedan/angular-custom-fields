import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomFieldsModule } from "./custom-fields/custom-fields.module";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CustomFieldsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
