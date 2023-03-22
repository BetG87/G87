import { Component } from '@angular/core';

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
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  images = ['assets/images/slide1.png', 'assets/images/slide1.png', 'assets/images/slide1.png'];
  showNavigationArrows = true;
  showNavigationIndicators = true;
  ngOnInit(): void {

  }
}
