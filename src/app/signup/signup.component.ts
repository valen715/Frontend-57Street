import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nombres: [null, [Validators.required]],
      primerApellido: [null, [Validators.required]],
      segundoApellido: [null],
      email: [null, [Validators.required, Validators.email]],
      celular: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      direccion: [null, [Validators.required]],
      clave: [null, [Validators.required]],
      confirmarClave: [null, [Validators.required]]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const clave = this.signupForm.get('clave')?.value;
    const confirmarClave = this.signupForm.get('confirmarClave')?.value;

    if (clave !== confirmarClave) {
      this.snackBar.open('Las claves no coinciden', 'Cerrar', { duration: 5000, panelClass: 'error-snackbar' });
      return;
    }

    this.authService.registrar(this.signupForm.value).subscribe(
      (response) => {
        // Manejar respuesta exitosa aquí
        this.snackBar.open('Registro exitoso!!', 'Cerrar', { duration: 5000 });
        this.router.navigateByUrl("/login");
      },
      (error) => {
        // Manejar error aquí
        this.snackBar.open('Registro fallido. Por favor, inténtelo de nuevo.', 'Cerrar', { duration: 5000 });
      }
    );
  }
}
