import { Component, OnInit } from '@angular/core';
import { NbDateService } from '@nebular/theme';

enum RecordTypes {
  expense = 'expense',
  income = 'income'
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  recordType: keyof typeof RecordTypes = 'expense';
  recordTypes = RecordTypes;

  currencies: string[] = [
    'MYR',
    'SGD',
    'USD',
    'BTC',
    'BTC'
  ];
  selectedCurrency = this.currencies[0];
  defaultCurrency = 'MYR';

  categories: string[] = [
    'Food',
    'Rental',
    'Bill',
  ];
  selectedCategory = this.categories[0];

  selectedDate: Date;
  description = "";

  constructor(dateService: NbDateService<Date>) {
    this.selectedDate = dateService.today();
  }

  ngOnInit() {
  }

}
