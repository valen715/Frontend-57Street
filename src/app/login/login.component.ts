import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuider: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuider.group({
      email: [null, [Validators.required]],
      clave: [null, [Validators.required]]
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const email = this.loginForm.get('email')!.value;
    const clave = this.loginForm.get('clave')!.value;

    this.authService.login(email, clave).subscribe(
      (response) => {
        if (UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/tablero');
        }else if(UserStorageService.isClienteLoggedIn()){
          this.router.navigateByUrl('clientes/tablero');
        }
      },
      (error) => {
        if (error.status === 401) {
          this.snackBar.open('Credenciales incorrectas', 'Error', { duration: 5000 });
        } else {
          this.snackBar.open('Ocurrió un error al iniciar sesión', 'Error', { duration: 5000 });
        }
      }
    );
  }

}


