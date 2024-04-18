import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-categoria',
  templateUrl: './post-categoria.component.html',
  styleUrls: ['./post-categoria.component.scss']
})
export class PostCategoriaComponent {

  categoriaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      nombre: [null, [Validators.required]]
    })
  }

  agregarCategoria(): void {
    if (this.categoriaForm.valid) {
      this.adminService.agregarCategoria(this.categoriaForm.value).subscribe(
        (response) => {
          if (response.id != null) {
            this.snackBar.open('Categoria agregada correctamente', 'Cerrar', {
              duration: 5000
            });
            this.router.navigateByUrl('/admin/tablero');
          } else {
            this.snackBar.open(response.message, 'Cerrar', {
              duration: 5000,
              panelClass: 'error-snackbar'
            });
          }
        })
    }else{
      this.categoriaForm.markAllAsTouched();
    }
  }
}
