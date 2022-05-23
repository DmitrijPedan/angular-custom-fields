import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular material dependencies
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule} from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { DragDropModule } from "@angular/cdk/drag-drop";

// services
import { CustomFieldService } from "./services/custom-field.service";

//components
import { GroupControlComponent } from './components/group-control/group-control.component';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { CustomFieldsFormComponent } from './components/custom-fields-form/custom-fields-form.component';
import { CustomValuesFormComponent } from './components/custom-values-form/custom-values-form.component';
import { FieldTitleComponent } from './components/field-title/field-title.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

// pipes
import { FieldNamePipe } from './pipes/field-name.pipe';
import { ValuesGroupControlComponent } from './components/values-group-control/values-group-control.component';
import { ValueFormComponent } from './components/value-form/value-form.component';


@NgModule({
  declarations: [
    FieldNamePipe,
    GroupControlComponent,
    FieldFormComponent,
    CustomFieldsFormComponent,
    CustomValuesFormComponent,
    FieldTitleComponent,
    ButtonsComponent,
    ValuesGroupControlComponent,
    ValueFormComponent,
  ],
  exports: [
    CustomFieldsFormComponent,
    CustomValuesFormComponent,
    MatIconModule,
    MatButtonModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
  ],
  providers: [CustomFieldService]
})
export class CustomFieldsModule { }
