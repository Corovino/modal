import { Pipe, PipeTransform } from '@angular/core';
import { Credit } from '../models/credit';


@Pipe({
  name: 'creditFilter'
})
export class CreditFilterPipe implements PipeTransform {

  transform(credit: any, searchTerm: any): any {
     if(!credit || !searchTerm){
        return credit;
     }

     return credit.filter(res => res.state.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 );
  }

}
