import { Component } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-carousel',
  template: `
  <ngb-carousel *ngIf="images"
              [showNavigationArrows]="showNavigationArrows"
              [showNavigationIndicators]="showNavigationIndicators">
  <ng-template ngbSlide *ngFor="let image of images">
    <div class="picsum-img-wrapper ">
      <img class="carousel" [src]="image" alt="Random slide" />
    </div>
  </ng-template>
</ngb-carousel>`,
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig],
})
export class CarouselComponent {
  images = ['assets/images/slide1.png', 'assets/images/slide2.png', 'assets/images/slide3.png', 'assets/images/slide4.png'];
  showNavigationArrows = true;
  showNavigationIndicators = true;
  interval = 50000
  ngOnInit(): void {

  }
  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 5000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
}
