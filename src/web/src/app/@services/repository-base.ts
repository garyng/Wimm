import { AppConstants } from '../@common/app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from '../@models/book';
import { Injectable } from '@angular/core';

export abstract class RepositoryBase<T> {
  protected baseEndpoint = AppConstants.Api.baseEndpoint;
  protected apiUrl = '';

  protected apiUrlFunc = (endpoint) => `${this.baseEndpoint}/${endpoint}`;

  constructor(protected endpoint: string, protected http: HttpClient) {
    this.apiUrl = this.apiUrlFunc(endpoint);
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  public get(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  public add(data: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, data);
  }

  public update(id: number, data: T): Observable<T> {
    return this.http.patch<T>(this.apiUrl, data);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class BookRepository extends RepositoryBase<Book> {
  constructor(http: HttpClient) {
    super('books', http);
  }
}
