import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vndFormat'
})
@Injectable({providedIn:'root'})
export class VndFormatPipe  implements PipeTransform {

  transform(value: any): string {
    if (isNaN(value)) {
      return '';
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    });

    return formatter.format(value);
  }

}
