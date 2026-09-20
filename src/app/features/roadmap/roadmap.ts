import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RoadmapResponse, RoadmapPhase } from '../../core/models/roadmap.models';

@Component({
  selector: 'app-roadmap',
  imports: [],
  templateUrl: './roadmap.html',
  styleUrl: './roadmap.css',
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

  downloadHtml(): void {
    const roadmapData = this.roadmap();
    if (!roadmapData) return;

    const html = this.buildHtmlContent(roadmapData);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roadmap-it-2030.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  downloadPdf(): void {
    window.print();
  }

  private buildHtmlContent(data: RoadmapResponse): string {
    const badgeColors: Record<string, string> = {
      now: 'background:#dcfce7;color:#15803d',
      hot: 'background:#fee2e2;color:#b91c1c',
      ai: 'background:#f3e8ff;color:#7e22ce',
      base: 'background:#f3f4f6;color:#4b5563',
    };

    const phasesHtml = data.phases
      .map(
        (phase, i) => `
    <div style="margin-bottom:48px">
      <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:24px">
        <div style="min-width:32px;height:32px;border-radius:50%;background:#3b82f6;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px">${i + 1}</div>
        <div>
          <p style="font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px">${phase.label}</p>
          <h2 style="font-size:20px;font-weight:700;color:#111827;margin:0 0 4px">${phase.title}</h2>
          <p style="font-size:14px;color:#6b7280;margin:0">${phase.description}</p>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
        ${phase.cards
          .map(
            (card) => `
          <div style="${card.fullWidth ? 'grid-column:span 2;' : ''}background:white;border:1px solid #e5e7eb;border-radius:16px;padding:24px">
            <h3 style="font-size:15px;font-weight:600;color:#111827;margin:0 0 16px">${card.title}</h3>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px">
              ${card.items
                .map(
                  (item) => `
                <li style="display:flex;align-items:flex-start;gap:8px">
                  <span style="margin-top:6px;min-width:6px;height:6px;border-radius:50%;background:#60a5fa;display:inline-block"></span>
                  <span style="font-size:13px;color:#374151;flex:1">${item.text}</span>
                  ${item.badge ? `<span style="font-size:11px;padding:2px 8px;border-radius:999px;font-weight:500;${badgeColors[item.badge] ?? badgeColors['base']}">${item.badge}</span>` : ''}
                </li>
              `,
                )
                .join('')}
            </ul>
            ${card.note ? `<p style="margin-top:16px;font-size:12px;color:#9ca3af;font-style:italic;border-top:1px solid #f3f4f6;padding-top:12px">${card.note}</p>` : ''}
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `,
      )
      .join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>IT Roadmap 2030</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; color: #111827; padding: 48px 24px; }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { font-size: 32px; font-weight: 800; margin-bottom: 8px; }
    .subtitle { color: #6b7280; margin-bottom: 48px; font-size: 16px; }
    @media print {
      body { background: white; padding: 24px; }
      .container { max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>IT Roadmap <span style="color:#3b82f6">2030</span></h1>
    <p class="subtitle">Generado con IT Roadmap AI</p>
    ${phasesHtml}
  </div>
</body>
</html>`;
  }
}
