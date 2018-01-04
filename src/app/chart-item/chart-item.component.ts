import { Component, OnInit } from '@angular/core';
import { Chart } from '../shared/models/chart';
import { ConfigService } from '../shared/services/config.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chart-item',
  templateUrl: './chart-item.component.html',
  styleUrls: ['./chart-item.component.scss'],
  inputs: ['chart', 'showVersion', 'showDescription']
})
export class ChartItemComponent implements OnInit {
  public iconUrl: string;
  // Chart to represent
  public chart: Chart;
  // Show version form by default
  public showVersion: boolean = true;
  // Truncate the description
  public showDescription: boolean = true;

  constructor(
    private config: ConfigService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.iconUrl = this.getIconUrl();
  }

  goToDetailUrl(): string {
    return `/charts/${this.chart.attributes.repo.name}/${this.chart.attributes
      .name}`;
  }

  goToRepoUrl(): string {
    return `/charts/${this.chart.attributes.repo.name}`;
  }

  getIconUrl(): string {
    let icon = this.chart.attributes.icon;
    if (icon !== undefined && icon.length > 0) {
      return this.config.backendHostname + "/chartsvc/" + icon;
    } else {
      return '/assets/images/placeholder.png';
    }
  }
}
