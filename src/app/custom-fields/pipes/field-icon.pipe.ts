import { Pipe, PipeTransform } from '@angular/core';
import {FieldType} from "../interfaces/interfaces";
import {FIELD_ICONS} from "../variables/field-icons";

@Pipe({
  name: 'fieldIcon'
})
export class FieldIconPipe implements PipeTransform {

  transform(type: FieldType): string {
    return FIELD_ICONS[type];
  }

}
