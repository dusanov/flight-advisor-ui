import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class ApiService {

    private readonly token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIl0sImV4cCI6MTYwMzk5NTAyMH0.jvXCIminYBeNXiqQXPSinDlJrHoat7dphjGcWY4dmpvT9dCv-P7DyJL4uYgA0LfwO8AMnbMCM_RJuSGFBMWtPA';
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      })
    };

    constructor(private http : HttpClient) {}

    public searchCheapestRoute(from: string, to: string){
        var url: string = "http://localhost:8080/api/routes/search/"+from+"/"+to;
        return this.http.get(url, this.httpOptions );
    }
}
