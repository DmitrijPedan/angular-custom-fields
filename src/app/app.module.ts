import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomFieldsModule } from "./custom-fields/custom-fields.module";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FieldsPageComponent } from './pages/pages/fields-page/fields-page.component';
import { ValuesPageComponent } from './pages/pages/values-page/values-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldsPageComponent,
    ValuesPageComponent
  ],
  imports: [
    BrowserModule,
    CustomFieldsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
