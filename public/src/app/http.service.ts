import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getGoals() {
    return this._http.get('/goals');
  }
  addGoal(newGoal) {
    return this._http.post('/goals', newGoal);
  }
  findOne(id) {
    return this._http.get('/goals/' + id);
  }
  editGoal(id, goal) {
    return this._http.put('/goals/' + id, goal);
  }
  delete(id) {
    return this._http.delete('/goals/' + id);
  }
}
