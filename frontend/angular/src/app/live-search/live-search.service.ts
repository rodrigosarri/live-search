import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LiveSearchService {
  private endPoint: string;

  constructor(
    private http: HttpClient,
  ) {
    this.endPoint = environment.apiUrl;
  }


  public getData(): Observable<any> {
    const base = this.http.get(
      `${this.endPoint}`,
    );

    const request = base.pipe(
      map((data) => {
        return data;
      })
    );

    return request;
  }
}
