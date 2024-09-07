import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected styleUrl to styleUrls
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loginSuccessful: boolean = false;
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  constructor(private router: Router) {}

  onLogin() {
    // Retrieve all users from localStorage
    const usersData = localStorage.getItem('users');
    
    if (usersData) {
      const users = JSON.parse(usersData); // Parse the stored JSON string

      // Check if there is a matching user with the entered email and password
      const user = users.find((u: any) => u.email === this.email && u.password === this.password);

      if (user) {
        // Success - navigate to home or show success message
        this.loginSuccessful = true;
        this.router.navigate(['/home']); // Navigate to home or any other page
      } else {
        // Failure - show inline error message
        this.errorMessage = 'Incorrect email or password. Please try again.';
      }
    } else {
      // No users stored in localStorage
      this.errorMessage = 'No users found. Please sign up first.';
    }
  }

  goToSignUpPage() {
    this.router.navigate(['/signup']); // Correct navigation to sign-up page
  }
}
