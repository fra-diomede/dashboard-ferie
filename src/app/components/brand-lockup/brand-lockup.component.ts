import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

type BrandVariant = 'lockup' | 'logo' | 'mark';
type BrandSize = 'sm' | 'md' | 'lg';
type BrandEmphasis = 'dark' | 'light';

@Component({
  selector: 'app-brand-lockup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-lockup.component.html',
  styleUrls: ['./brand-lockup.component.scss']
})
export class BrandLockupComponent {
  @Input() variant: BrandVariant = 'lockup';
  @Input() size: BrandSize = 'md';
  @Input() emphasis: BrandEmphasis = 'dark';
  @Input() showTagline = true;
  @Input() alt = 'TimeOffly';

  @HostBinding('class')
  get hostClasses() {
    return `brand-host variant-${this.variant} size-${this.size} emphasis-${this.emphasis}`;
  }
}
