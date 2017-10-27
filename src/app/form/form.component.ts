import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  options = ['BMW', 'Ferrari', 'Bugatti', 'Benz', 'Alaska', 'Tesla'];

  loginFormGroup: FormGroup;

  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    const fb = new FormBuilder();
    this.loginFormGroup = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: [null, Validators.email],
      car: '',
      date: null
    });

    // 在FormControl上绑定valueChanges处理程序
    this.filteredOptions = this.loginFormGroup.get('car').valueChanges
      .startWith(null)
      .map(value => value ? this.filter(value) : this.options.slice()); // 无输入值时返回全部数组全部元素
  }

  // 过滤：对数组各列表项进行前缀匹配
  filter(value: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  checkForm() {
  }
}
