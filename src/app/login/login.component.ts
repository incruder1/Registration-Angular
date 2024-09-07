import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private router: Router) {}
  loginSuccessful: boolean = false;
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  onLogin() {
    // Retrieve credentials from localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser); // Parse the stored JSON string

      // Check if the entered email and password match the stored credentials
      if (this.email === user.email && this.password === user.password) {
        // Success - navigate to home or show success modal
        this.loginSuccessful = true;
      } else {
        // Failure - show inline error message
        this.errorMessage = 'Incorrect password. Please try again.';
      }
    } else {
      // No user stored in localStorage
      this.errorMessage = 'No user found. Please sign up first.';
    }
  }
}