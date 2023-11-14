import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from './loader-component/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'parsing-extension';
  loading = false;

  sources = [
    { id: 0, value: 'mysql/mariadb', label: 'MySQL/MariaDB', port: 3306 },
    { id: 1, value: 'postgresql', label: 'PostgreSQL', port: 5432 },
    { id: 2, value: 'sqlite', label: 'SQLite' },
    { id: 3, value: 'csv', label: 'CSV file' },
    { id: 4, value: 'oracle', label: 'Oracle', port: 1521 },
    { id: 5, value: 'mongodb', label: 'MongoDB', port: 27017 },
  ];

  profileForm = new FormGroup({
    source: new FormControl<string>('csv', Validators.required),
    fileURL: new FormControl<string>(
      'https://sample-videos.com/csv/Sample-Spreadsheet-100-rows.csv',
      [Validators.required, this.linkCSVValidator]
    ),
    dbConnection: new FormGroup({
      host: new FormControl<string>('localhost', Validators.required),
      port: new FormControl<string>(''),
      database: new FormControl<string>('', Validators.required),
      user: new FormControl<string>('root', Validators.required),
      password: new FormControl<string>('', Validators.required),
    }),
  });

  constructor() {
    this.setupFormControls();
  }

  private setupFormControls() {
    const { fileURL, dbConnection } = this.profileForm.controls;

    this.profileForm.controls.dbConnection.disable();

    this.profileForm.get('source')?.valueChanges.subscribe((value) => {
      const selectedSource = this.sources.find(
        (source) => source.value === value
      );

      if (selectedSource?.value === 'csv') {
        fileURL.enable();
        dbConnection.disable();
      } else {
        fileURL.disable();
        dbConnection.enable();
        dbConnection.controls.port.setValue('');

        if (selectedSource) {
          dbConnection.controls.port.patchValue(String(selectedSource.port));
        }
      }
    });
  }

  linkCSVValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && !control.value.toLowerCase().endsWith('.csv')) {
      return { notCSV: true };
    }

    return null;
  }

  onSubmit() {
    alert(JSON.stringify(this.profileForm.value));
    this.loading = true;
  }
}
