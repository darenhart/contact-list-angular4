import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.scss'],
  providers: []
})
export class BracketsComponent {

  brackets: string = "";
  isValid: boolean;

  constructor() {
  }
  
  validate(str): boolean {

    this.isValid = true;
    if (str.length <= 1)
      return this.isValid = false;

    let matchingOpeningBracket, brk;
    let stack = [];
    let openingBrackets = ['[', '{', '('];
    let closingBrackets = [']', '}', ')'];

    for (let i = 0; i < str.length; i++) {
      brk = str[i];

      if (closingBrackets.indexOf(brk) > -1) {
        matchingOpeningBracket = openingBrackets[closingBrackets.indexOf(brk)];
        if (stack.length == 0 || (stack.pop() != matchingOpeningBracket)) {
          this.isValid = false;
        }
      } else {
        stack.push(brk);
      }
    }

    this.isValid = this.isValid ? (stack.length == 0) : this.isValid;
    return this.isValid;
  }
  
  
}
