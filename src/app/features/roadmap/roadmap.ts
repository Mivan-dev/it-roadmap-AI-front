import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RoadmapResponse, RoadmapPhase } from '../../core/models/roadmap.models';

@Component({
  selector: 'app-roadmap',
  imports: [],
  templateUrl: './roadmap.html',
  styleUrl: './roadmap.css'
})
export class Roadmap implements OnInit {
  private readonly router = inject(Router);

  roadmap = signal<RoadmapResponse | null>(null);

  ngOnInit(): void {
  const state = history.state as { data: RoadmapResponse } | undefined;

  if (state?.data) {
    this.roadmap.set(state.data);
  } else {
    this.router.navigate(['/']);
  }
}

  goHome(): void {
    this.router.navigate(['/']);
  }

  getBadgeClass(badge: string): string {
  const classes: Record<string, string> = {
    now: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    hot: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    ai: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    base: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  };
  return classes[badge] ?? classes['base'];
  }

}