import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[inputNumberOnly]',
})
export class InputNumberOnlyDirective {
  private regex = /[^\d]/g; // chỉ cho phép nhập các ký tự số

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(this.regex, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
