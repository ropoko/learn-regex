import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <header>
      <h1>
        Hello world!
      </h1>
    </header>
    <main>
      <form [formGroup]="form">
        <label for="numbers">
          <input (change)="regex()" formControlName="numbers" type="checkbox" id="numbers">
          Get numbers
        </label>

        <section formGroupName="inputs">
          <label for="reponse">Test text goes here</label>
          <textarea (keydown)="regex()" (focus)="regex()" formControlName="testText" id="response" cols="45" rows="10"></textarea>
          <input formControlName="matchedString" class="matchText" value="{{matchString}}" readonly />
        </section>
      </form>
    </main>
  </div>
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
        // apply regex to numbers
        if (this.form.get('numbers')?.value === true) {
          this.matchString = testText.value.match(/[0-9]/gm)?.join('');
        } else {
          this.form.get('inputs.matchedString')?.patchValue('');
        }
      }
    });
  }
}
