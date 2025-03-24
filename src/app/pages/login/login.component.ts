import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  errorMessage!: string
  constructor(private formBuilder: FormBuilder, private authService: AuthService){

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nomUtilisateur: ['', [
        Validators.required,
      ]],
      
      motdepasse: ['', [
        Validators.required,
      ]],
    })
  }

  onSubmit(): void{
    if(this.loginForm.valid){
      this.authService.connexion(this.loginForm.value).subscribe(
        (response) => {
          this.authService.sauvegarderToken(response.token)
          console.log("Connexion réussi")
        },
        (error) => {
            if(error.status === 400){
              this.errorMessage = "Utilisateur ou mot de passe incorrecte"
            }
        }
      )
      console.log(this.loginForm.value)

    }
  }
}
