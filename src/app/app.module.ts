import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomFieldsModule } from "./custom-fields/custom-fields.module";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CustomFieldsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
