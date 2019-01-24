import { AppConstants } from '../@common/app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Budget } from '../@models/budget';
import { Category } from '../@models/category';
import { Recurrence } from '../@models/recurrence';
import { Record } from '../@models/record';
import { map } from 'rxjs/operators';
import { User } from '../@models/user';
import { Currency } from '../@models/currency';

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
    return this.http.patch<ApiResponse<T>>(`${this.apiUrl}/${id}`, data).pipe(
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

@Injectable({
  providedIn: 'root'
})
export class CurrenciesRepository {
  protected baseEndpoint = AppConstants.Api.baseEndpoint;
  protected apiUrl = '';

  protected apiUrlFunc = (endpoint) => `${this.baseEndpoint}/${endpoint}`;

  constructor(protected http: HttpClient) {
    this.apiUrl = this.apiUrlFunc('currencies');
  }

  public getAll(): Observable<Currency[]> {
    return this.http.get<ApiResponse<Currency[]>>(this.apiUrl).pipe(
      map(response => response.data),
    );
  }

  public getRate(from: string, to: string): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.apiUrl}/${from}/${to}`).pipe(
      map(response => response.data),
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserRepository {
  protected baseEndpoint = AppConstants.Api.baseEndpoint;
  protected apiUrl = '';

  protected apiUrlFunc = (endpoint) => `${this.baseEndpoint}/${endpoint}`;

  constructor(protected http: HttpClient) {
    this.apiUrl = this.apiUrlFunc('user');
  }

  public get(): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}`).pipe(
      map(response => response.data),
    );
  }

  public updateCurrency(data: {currency: string}): Observable<User> {
    return this.http.patch<ApiResponse<User>>(`${this.apiUrl}/currency`, data).pipe(
      map(response => response.data),
    );
  }
}

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
