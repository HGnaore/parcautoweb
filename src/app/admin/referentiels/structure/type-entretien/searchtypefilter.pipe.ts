import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchtypefilter'
})
export class SearchtypefilterPipe implements PipeTransform {

  transform(data: any[], searchValue: string): any[] {

    return data.filter(data =>
      data.designation.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}