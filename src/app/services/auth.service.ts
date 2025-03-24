import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: String = environment.apiUrl

  constructor(private http: HttpClient) { }

  connexion(credential: Credential): Observable<any> {
    return this.http.post<any> (`${this.apiUrl}/auth/connexion`, credential)
  }

  sauvegarderToken(token: string): void {
    localStorage.setItem("token", token)
  }

  deconnexion(): void{
    localStorage.removeItem("token")
  }

  recupererToken(): string | null{
    const token = localStorage.getItem("token")
    return token
  }

  estConnecte(): boolean{
    if(this.recupererToken()){
      return true
    }

    return false
  }


}
