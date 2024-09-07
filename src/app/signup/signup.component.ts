import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    CommonModule, 
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
  registerSuccessful: boolean = false;
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  // Step 2 fields
  organizationName: string = '';
  organizationId: string = '';
  Designation: string = '';
  birthDate: string = '';
  city: string = '';
  pincode: string = '';
  step2ErrorMessage: string = '';

  constructor(private router: Router) {}

  // Handle 'Next' button click in Step 1
  onNext() {
    // Step 1: Check if all required fields are filled
    if (!this.name || !this.email || !this.password) {
      this.step1ErrorMessage = 'Please fill out all fields correctly.';
    } 
    // Step 2: Check if the user already exists in localStorage
    else {
      // Get all users from localStorage (or an empty array if no users exist)
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Check if a user with the same email already exists
      const userExists = users.some((user: any) => user.email === this.email);

      if (userExists) {
        this.step1ErrorMessage = 'User already exists';
        return;
      }

      // Step 3: Proceed if all checks pass
      this.step1ErrorMessage = ''; // Clear the error message
      this.selectedIndex = 1; // Move to the next step (e.g., switching tabs or forms)
      this.progressValue = 100; // Update progress bar to reflect step completion
    }
  }

  onBack() {
    this.selectedIndex = 0;
    this.progressValue = 50;
  }

  goToLoginPage() {
    this.router.navigate(['/']); // Replace '/login' with the actual route of your login page
  }

  // Handle 'Submit' button click in Step 2
  onSubmit() {
    if (
      !this.organizationName ||
      !this.organizationId ||
      !this.birthDate ||
      !this.city ||
      !this.pincode ||
      !this.Designation ||
      !this.pincode.length
    ) {
      this.step2ErrorMessage = 'Please fill out all fields correctly.';
    } else {
      this.step2ErrorMessage = ''; // Clear the error message

      // Save the new user to localStorage
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
        organizationName: this.organizationName,
        organizationId: this.organizationId,
        birthDate: this.birthDate,
        Designation: this.Designation,
        city: this.city,
        pincode: this.pincode
      };

      // Get existing users from localStorage (if any)
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Add the new user to the users array
      users.push(newUser);

      // Save the updated users array back to localStorage
      localStorage.setItem('users', JSON.stringify(users));

      this.registerSuccessful = true;
    }
  }
}
