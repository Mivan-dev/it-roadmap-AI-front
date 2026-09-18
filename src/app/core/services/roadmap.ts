import { Service } from '@angular/core';

@Service()
export class Roadmap {}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoadmapParams, RoadmapResponse } from '../models/roadmap.models';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/roadmap';

  generateRoadmap(params: RoadmapParams): Observable<RoadmapResponse> {
    return this.http.post<RoadmapResponse>(this.apiUrl, params);
  }
}