import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchgarfilter'
})
export class SearchgarfilterPipe implements PipeTransform {

  transform(data: any[], searchValue: string): any[] {

    return data.filter(data =>
      data.designation.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      data.fixe.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      data.portable.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      data.pf_nomprenoms.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      data.pf_portable.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}