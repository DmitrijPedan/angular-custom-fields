import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from "@angular/material/expansion";


import { CustomFieldService } from "./services/custom-field.service";

import { GroupControlComponent } from './components/group-control/group-control.component';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { CustomFieldsFormComponent } from './components/custom-fields-form/custom-fields-form.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { FieldTitleComponent } from './components/field-title/field-title.component';

@NgModule({
  declarations: [
    GroupControlComponent,
    FieldFormComponent,
    CustomFieldsFormComponent,
    FieldTitleComponent,
  ],
  exports: [
    CustomFieldsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [CustomFieldService]
})
export class CustomFieldsModule { }
