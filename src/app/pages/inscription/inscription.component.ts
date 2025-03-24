import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { InscriptionService } from '../../services/inscription.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-inscription',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {

  inscriptionForm: FormGroup
  isLoading: Boolean = false
  errors: any;
  constructor(private formBuilder: FormBuilder, private inscriptionService: InscriptionService){
    this.inscriptionForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      
      nomUtilisateur: ['', [
        Validators.required,
        Validators.minLength(4)
      ], [this.nomUtilisateurUnique.bind(this)]],
      
      motdepasse: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[A-Z]/), 
        Validators.pattern(/\d/), 
        Validators.pattern(/[@$!%*?&]/)
      ]],
      confirmationMotDePasse: ['', Validators.required]
    }, { validator: this.passwordsMatch });
  }

  passwordsMatch(formGroup: FormGroup) {
    return formGroup.get('motdepasse')?.value === formGroup.get('confirmationMotDePasse')?.value 
      ? null 
      : { mismatch: true };
  }

  nomUtilisateurUnique(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.inscriptionService.verifierNomUtilisateur(control.value).pipe(
      map(isTaken => (isTaken ? { nomUtilisateurPris: true } : null))
    );
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      const formData = this.inscriptionForm.value;
      this.isLoading = true
      this.inscriptionService.inscrireClient(formData).subscribe(response => {
        this.inscriptionForm.reset()
        this.isLoading = false
        console.log('Inscription réussie', response);
      }, error => {
        this.isLoading = false
        this.errors = error.error.errors
        console.error('Erreur lors de l’inscription', this.errors);
      });
    }
  }
}
