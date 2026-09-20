import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoadmapParams, ExperienceLevel, Objective, Timeframe } from '../../core/models/roadmap.models';
import { RoadmapService } from '../../core/services/roadmap';

const PRESET_TECHS = [
  { label: 'JavaScript', category: 'Frontend' },
  { label: 'TypeScript', category: 'Frontend' },
  { label: 'React', category: 'Frontend' },
  { label: 'Angular', category: 'Frontend' },
  { label: 'Vue', category: 'Frontend' },
  { label: 'Next.js', category: 'Frontend' },
  { label: 'Svelte', category: 'Frontend' },
  { label: 'Node.js', category: 'Backend' },
  { label: 'Python', category: 'Backend' },
  { label: 'Java', category: 'Backend' },
  { label: 'C#', category: 'Backend' },
  { label: 'Go', category: 'Backend' },
  { label: 'PHP', category: 'Backend' },
  { label: 'Ruby', category: 'Backend' },
  { label: 'PostgreSQL', category: 'Databases/Other' },
  { label: 'MongoDB', category: 'Databases/Other' },
  { label: 'Docker', category: 'Databases/Other' },
  { label: 'AWS', category: 'Databases/Other' },
];

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private readonly router = inject(Router);
  private readonly roadmapService = inject(RoadmapService);

  readonly presetTechs = PRESET_TECHS;
  readonly categories = ['Frontend', 'Backend', 'Databases/Other'];

  selectedTechs = signal<string[]>([]);
  customTech = signal<string>('');
  objective = signal<Objective>('frontend');
  experienceLevel = signal<ExperienceLevel>('none');
  timeframe = signal<Timeframe>('6months');
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  toggleTech(tech: string): void {
    const current = this.selectedTechs();
    if (current.includes(tech)) {
      this.selectedTechs.set(current.filter(t => t !== tech));
    } else {
      this.selectedTechs.set([...current, tech]);
    }
  }

  addCustomTech(): void {
    const tech = this.customTech().trim();
    if (tech && !this.selectedTechs().includes(tech)) {
      this.selectedTechs.set([...this.selectedTechs(), tech]);
      this.customTech.set('');
    }
  }

  removeTech(tech: string): void {
    this.selectedTechs.set(this.selectedTechs().filter(t => t !== tech));
  }

  onCustomTechKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addCustomTech();
    }
  }

  getTechsByCategory(category: string) {
    return this.presetTechs.filter(t => t.category === category);
  }

  canSubmit(): boolean {
    return this.selectedTechs().length > 0 && !this.isLoading();
  }

  submit(): void {
    if (!this.canSubmit()) return;

    const params: RoadmapParams = {
      experienceLevel: this.experienceLevel(),
      language: this.selectedTechs().join(', '),
      objective: this.objective(),
      timeframe: this.timeframe(),
    };

    this.isLoading.set(true);
    this.error.set('');

    this.roadmapService.generateRoadmap(params).subscribe({
      next: (response) => {
        this.router.navigate(['/roadmap'], { state: { data: response } });
      },
      error: (err) => {
        this.error.set('Hubo un error generando el roadmap. Intentá de nuevo.');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }

  clearTechs(): void {
  this.selectedTechs.set([]);
  }

}
