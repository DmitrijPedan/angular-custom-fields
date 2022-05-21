import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomFieldService } from "./services/custom-field.service";

import { GroupControlComponent } from './components/group-control/group-control.component';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { CustomFieldsFormComponent } from './components/custom-fields-form/custom-fields-form.component';
import { AddFieldButtonComponent } from './components/add-field-button/add-field-button.component';

@NgModule({
  declarations: [
    GroupControlComponent,
    FieldFormComponent,
    CustomFieldsFormComponent,
    AddFieldButtonComponent,
  ],
  exports: [
    CustomFieldsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
  ],
  providers: [CustomFieldService]
})
export class CustomFieldsModule { }
