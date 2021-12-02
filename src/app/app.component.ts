import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  form!: FormGroup;
  matchString: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      numbers: [false],
      lowercase: [false],
      uppercase: [false],
      inputs: this.fb.group({
        testText: [' batatinha Frita 123...'],
        matchedString: ['']
      })
    });
  }

  regex(): void {
    const testText: AbstractControl = this.form.get('inputs.testText')!;

    Object.keys(this.form.controls).forEach(key => {
      if (key !== 'inputs') {
        this.matchString = '';
        // apply regex to numbers
        if (this.form.get('numbers')?.value === true) {
          this.matchString += testText.value.match(/[0-9]/gm)?.join('') ?? '';
        }        
        
        if (this.form.get('lowercase')?.value === true) {
          this.matchString += testText.value.match(/[a-z]/gm)?.join('') ?? '';
        }

        if (this.form.get('uppercase')?.value === true) {
          this.matchString += testText.value.match(/[A-Z]/gm)?.join('') ?? '';
        }
      }
    });
  }
}
