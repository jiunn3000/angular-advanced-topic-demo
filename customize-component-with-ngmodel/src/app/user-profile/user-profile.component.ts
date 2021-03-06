import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, forwardRef, Input } from '@angular/core';

export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UserProfileComponent),
  multi: true
};

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [USER_PROFILE_VALUE_ACCESSOR]
})
export class UserProfileComponent implements ControlValueAccessor {

  user: any;

  get name() {
    return this.user.name;
  }

  set name(value) {
    this.user.name = value;
    this.notifyValueChange();
  }

  get age() {
    return this.user.age;
  }

  set age(value) {
    this.user.age = value;
    this.notifyValueChange();
  }

  @Input() disabled: boolean;

  onChange: (value) => {};
  onTouched: () => {};

  constructor() {
    this.user = {};
  }

  notifyValueChange() {
    if (this.onChange) {
      this.onChange({
        name: this.name,
        age: this.age
      });
    }
  }

  writeValue(obj: any): void {
    this.user = obj;
    if (!this.user) {
      this.user = {};
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
