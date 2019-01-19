import { AppConstants } from '../@common/app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Budget } from '../@models/budget';
import { Category } from '../@models/category';
import { Recurrence } from '../@models/recurrence';
import { Record } from '../@models/record';
import { map } from 'rxjs/operators';

export class ApiErrorResponse {
  public code: string;
  public fields?: {
    field: string,
    errors: string[]
  }[];
  public message: string;
}

export class ApiResponse<T> {

  public status: number;
  public success: boolean;
  public data?: T;
  public error?: ApiErrorResponse;
}

export abstract class RepositoryBase<T> {
  protected baseEndpoint = AppConstants.Api.baseEndpoint;
  protected apiUrl = '';

  protected apiUrlFunc = (endpoint) => `${this.baseEndpoint}/${endpoint}`;

  constructor(protected endpoint: string, protected http: HttpClient) {
    this.apiUrl = this.apiUrlFunc(endpoint);
  }

  public getAll(): Observable<T[]> {
    return this.http.get<ApiResponse<T[]>>(this.apiUrl).pipe(
      map(response => response.data),
    );
  }

  public get(id: number): Observable<T> {
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
    );
  }

  public add(data: T): Observable<T> {
    return this.http.post<ApiResponse<T>>(this.apiUrl, data).pipe(
      map(response => response.data),
    );
  }

  public update(id: number, data: T): Observable<T> {
    return this.http.patch<ApiResponse<T>>(this.apiUrl, data).pipe(
      map(response => response.data),
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
    );
  }

}

@Injectable({
  providedIn: 'root'
})
export class BudgetsRepository extends RepositoryBase<Budget> {
  constructor(http: HttpClient) {
    super('budgets', http);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesRepository extends RepositoryBase<Category> {
  constructor(http: HttpClient) {
    super('categories', http);
  }
}

// currencies
// user


@Injectable({
  providedIn: 'root'
})
export class RecordsRepository extends RepositoryBase<Record> {
  constructor(http: HttpClient) {
    super('records', http);
  }
}


@Injectable({
  providedIn: 'root'
})
export class RecurrencesRepository extends RepositoryBase<Recurrence> {
  constructor(http: HttpClient) {
    super('recurrences', http);
  }
}
