$(document).ready(function(){
  function boardSetup () {
    for(var i = 0, row; i < 8; i++){
      row = $('<div class="row">');
      $('#board').append(row);
      for(var j = 0, color, cell; j < 8; j++){
        color = (i + j) % 2 === 0 ? 'white' : 'silver';
        cell = cellSetup(i, j, color);
        row.append(cell);
      }
    }
  }
  function cellSetup(row, col, color) {
    var cell = $('<div id="' + row.toString() + col.toString() + '">').addClass('cell').addClass(color);
    if (row < 2 || row > 5) {
      return cell.html(board[row][col].img);
    }
    return cell;
  }
  boardSetup();

  $('.cell').click(function(){
    var getId = $(this).attr('id');
    var piece = board[getId[0]][getId[1]];
    if(piece && piece.color === currTurn){
      var targets = piece.getTargets();
      highlightTargets(targets);
      $(this).addClass('highlight-select');
    }

  });
  function highlightTargets(targets){
    clearHighlight();
    for (var i = 0; i < targets.length; i++) {
      highlightCell(targets[i]);
    }
  }
  function highlightCell(target){
    $('#' + target.x.toString() + target.y.toString()).addClass('highlight');
  }

  function clearHighlight(){
    $('.highlight').removeClass('highlight');
    $('.highlight-select').removeClass('highlight-select');
  }
});
