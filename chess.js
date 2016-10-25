$(document).ready(function(){
  function boardSetup () {
    for(var i = 0, row; i < 8; i++){
      row = $('<div class="row">');
      $('#board').append(row);
      for(var j = 0, color, cell; j < 8; j++){
        color = (i + j) % 2 === 0 ? 'black' : 'white';
        cell = cellSetup(i, j, color);
        row.append(cell);
      }
    }
  }
  function cellSetup(row, col, color) {
    return $('<div id="' + row.toString() + col.toString() + '">').addClass('cell').addClass(color).addClass();
  }
  boardSetup();
});
