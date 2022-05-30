import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

export class ArrayValidators {

  public static maxLength(max: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length > max ? { arrMax: true } : null;
    }
  }

  public static minLength(min: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length < min ? { arrMin: true } : null;
    }
  }
}
