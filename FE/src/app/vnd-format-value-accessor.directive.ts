import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { VndFormatPipe } from './vnd.pipe';
@Directive({
  selector: '[VndFormatValueAccessor]',
  host: {
    '(input)': 'onInputChange($event.target.value)'
  }

})
export class VndFormatValueAccessorDirective {

  constructor(private el: ElementRef, private renderer: Renderer2, private vndFormatPipe: VndFormatPipe) {}

  onInputChange(value: string) {
    if (value && value !== '' && value.slice(-3) !== 'VND') { // Nếu giá trị nhập vào không phải là VND thì mới format
      value = this.vndFormatPipe.transform(value); // Sử dụng pipe để định dạng giá trị
      //this.renderer.setProperty(this.el.nativeElement, 'value', value + ' VND'); // Thêm VND vào cuối giá trị định dạng
    }
  }
  @HostListener('blur') onBlur() {
    const value = Number(this.el.nativeElement.value);
    if (!isNaN(value)) {
      const formattedValue = this.vndFormatPipe.transform(value);
      this.el.nativeElement.value = formattedValue;
    }
  }
}
