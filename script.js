$(document).ready(function() {
  //set variables
  var x = '';
  var operations = ['+', '-', '*', '/'];
  var decimal = ['.'];
  $('input').attr('disabled', true);
  $('.null').attr('disabled', true);

  //update input field
  function printThis(k) {
    $('input').val(x += k);
  }

  //fun a function when a button is clicked
  $('button').on('click', function() {
    //turn calculator on and off
    if (this.id === 'on-off') {
      if ($('.null').attr('disabled') && $('input').attr('disabled', true)) {
        $('input').removeAttr('disabled');
        $('.null').removeAttr('disabled');
      } else {
        x = '';
        $('input').val('').attr('disabled', true);
        $('.null').attr('disabled', true);
      }
    }
    //clear the input field
    else if (this.id === 'cancel') {
      x = '';
      $('input').val(x);
    }
    //delete the last entry from the input field
    else if (this.id === 'delete') {
      x = x.slice(0, -1);
      $('input').val(x);
    }
    //calculate
    else if (this.id === 'equal') {
      if (!x) {
        x = 0;
        $('input').val(x);
      } else {
        x = Math.round(eval(x) * 10000) / 10000;
        $('input').val(x);
      }
    }
    else {
      //print a zero
      if (this.id === '0') {
        //if there is no zero, print it
        if ((x.length === 0) || (operations.includes(x[(x.length) - 1]))) {
          printThis(this.id);
        }
        //if zero is the first digit in a new number and the last entry in the input field, replace the 0 with a new zero
        else if (((x.length === 1) && (x[0] === this.id)) || (operations.includes(x[(x.length) - 2])) && (x[(x.length) - 1] === this.id)) {
          x = x.slice(0, -1);
          printThis(this.id);
        }
        else {
          printThis(this.id);
        }
      }
      //print an operation
      else if (operations.includes(this.id)) {
        //if the last entry in the input field is an operation, replace it with the new operation
        if (x) {
          if (operations.includes(x[(x.length) - 1])) {
            x = x.slice(0, -1);
            printThis(this.id);
          } else {
            printThis(this.id);
          }
        }
      }
      //print a decimal
      else if (decimal.includes(this.id)) {
        //if the input field is empty, print 0.
        if ((x === '') || (operations.includes(x[(x.length) - 1]))) {
          printThis((0 + this.id));
        }
        //if the last entry in the input field is a decimal, replace it with  new decimal
        else if (decimal.includes(x[(x.length) - 1])) {
          x = x.slice(0, -1);
          printThis(this.id);
        }
        else {
          var y = x.split(/[+,-,*,/]/g);
          if (((y[(y.length) - 1]).indexOf(this.id)) < 0) {
            printThis(this.id);
          }
        }
      }
      //print the corresponding number or operation
      else {
        printThis(this.id);
      }
    }
  });
});
