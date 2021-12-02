import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <body>
  <div class="container">
    <header>
     <h1>Learn Regex</h1>
    </header>
    <main>
      <form [formGroup]="form">
        <label for="numbers">
          <input (change)="regex()" formControlName="numbers" type="checkbox" id="numbers">
          Get numbers
        </label>
        <label for="lowercase">
          <input (change)="regex()" formControlName="lowercase" type="checkbox" id="lowercase">
          Get lower
        </label>
        <label for="uppercase">
          <input (change)="regex()" formControlName="uppercase" type="checkbox" id="uppercase">
          Get upper
        </label>

        <section formGroupName="inputs">
          <label for="testText">Text: </label>
          <textarea (keydown)="regex()" (focus)="regex()" formControlName="testText" id="testText" cols="45" rows="10"></textarea>
          <input formControlName="matchedString" class="matchText" value="{{matchString}}" readonly />
        </section>
      </form>
    </main>
  </div>
  </body>
  `,
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
        testText: [' auhduhs 123123'],
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
