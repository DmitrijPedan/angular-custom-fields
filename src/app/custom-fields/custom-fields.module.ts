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
import { CustomValuesService } from "./services/custom-values.service";
import { ViewService } from "./services/view.service";

//components
import { FieldsGroupControlComponent } from './components/fields-group-control/fields-group-control.component';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { CustomFieldsFormComponent } from './components/custom-fields-form/custom-fields-form.component';
import { CustomValuesFormComponent } from './components/custom-values-form/custom-values-form.component';
import { FieldTitleComponent } from './components/field-title/field-title.component';
import { ButtonsBarComponent } from './components/buttons-bar/buttons-bar.component';
import { ValuesGroupControlComponent } from './components/values-group-control/values-group-control.component';
import { ValueFormComponent } from './components/value-form/value-form.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { ImageInputComponent } from './components/image-input/image-input.component';
import { FormValidationMessageComponent } from './components/form-validation-message/form-validation-message.component';


// pipes
import { FieldNamePipe } from './pipes/field-name.pipe';
import { FieldIconPipe } from "./pipes/field-icon.pipe";
import { AccordionItemTitleComponent } from './components/accordion-item-title/accordion-item-title.component';


@NgModule({
  declarations: [
    FieldNamePipe,
    FieldIconPipe,
    FieldsGroupControlComponent,
    FieldFormComponent,
    CustomFieldsFormComponent,
    CustomValuesFormComponent,
    FieldTitleComponent,
    ButtonsBarComponent,
    ValuesGroupControlComponent,
    ValueFormComponent,
    SubmitButtonComponent,
    ToggleButtonComponent,
    ImageInputComponent,
    AccordionItemTitleComponent,
    FormValidationMessageComponent,
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
  providers: [CustomFieldService, CustomValuesService, ViewService]
})
export class CustomFieldsModule { }
