import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    CommonModule, // Correct import
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTabsModule
  ]
})
export class SignupComponent {
  selectedIndex = 0; // Controls the active tab
  progressValue = 50; // Controls the progress bar value
  // Step 1 fields
  name: string = '';
  email: string = '';
  password: string = '';
  step1ErrorMessage: string = '';
  errorMessage: string = '';
  loginSuccessful: boolean = false;
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  // Step 2 fields
  organizationName: string = '';
  organizationId: string = '';
  birthDate: string = '';
  city: string = '';
  pincode: string = '';
  step2ErrorMessage: string = '';

  constructor(private router: Router) {}

  // Handle 'Next' button click in Step 1
  onNext() {
    if (!this.name || !this.email || !this.password) {
      this.step1ErrorMessage = 'Please fill out all fields.';
    } else {
      this.step1ErrorMessage = ''; // Clear the error message
      this.selectedIndex = 1; // Move to the next step
      this.progressValue = 100; // Update progress bar
    }
  }

  // Handle 'Submit' button click in Step 2
  onSubmit() {
    if (
      !this.organizationName ||
      !this.organizationId ||
      !this.birthDate ||
      !this.city ||
      !this.pincode ||
      this.pincode.length !== 6
    ) {
      this.step2ErrorMessage = 'Please fill out all fields correctly.';
    } else {
      this.step2ErrorMessage = ''; // Clear the error message

      // Save the data to localStorage
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        organizationName: this.organizationName,
        organizationId: this.organizationId,
        birthDate: this.birthDate,
        city: this.city,
        pincode: this.pincode
      };

      localStorage.setItem('user', JSON.stringify(user));

      alert('Signup successful!');
      this.router.navigate(['/login']);
    }
  }
}