import { Component,Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { F } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-custom-input',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss'
})
export class CustomInput {
  
  @ViewChild('myInput') myInput!: ElementRef<HTMLInputElement>;
  searchIconUrl = 'assets/search.svg';
  @Input() searchBar : string = this.searchIconUrl;
  @Input() btnText : string = "Search";
  @Input() isValid : boolean = false;
  isIcon : boolean = this.searchBar === "Sign Up" ? true : false;
  
  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  
}
