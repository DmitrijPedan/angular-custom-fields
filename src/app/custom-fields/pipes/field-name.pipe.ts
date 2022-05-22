import { Pipe, PipeTransform } from '@angular/core';
import {FieldType} from "../interfaces/interfaces";
import {FIELD_TYPES} from "../variables/field-types";

@Pipe({
  name: 'fieldName'
})
export class FieldNamePipe implements PipeTransform {

  transform(type: FieldType): string {
    const t = FIELD_TYPES.find(el => el.type === type);
    return t ? t.displayName : type;
  }

}
