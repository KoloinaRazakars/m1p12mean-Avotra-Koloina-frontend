import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../modeles/Client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  inscrireClient(client: any)
  {
    console.log(client)
   return this.http.post(`${this.apiUrl}/clients`, client);
  }

  verifierNomUtilisateur(nomUtilisateur: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/clients/verifier-nom-utilisateur?nomUtilisateur=${nomUtilisateur}`);
  }

}
