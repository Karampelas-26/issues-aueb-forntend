import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value: string = control.value;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumeric = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/.test(value);
        const isLengthValid = value && value.length >= 8;
    
        const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isLengthValid;
    
        return valid ? null : { 'passwordStrength': true };
      };
}