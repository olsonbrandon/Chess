var board = [new Array(8),new Array(8),new Array(8),new Array(8),new Array(8),new Array(8),new Array(8),new Array(8)];
var currTurn = 'white';

function Piece (row, col, color){
  this.row = row;
  this.col = col;
  this.color = color;
  this.img = null;
}
Piece.prototype.board = board;
Piece.prototype.moveTo = function(x, y){
  Piece.prototype.board[x][y] = this;
  // Piece.prototype.board[this.row][this.col]
  this.row = x;
  this.col = y;
};
function Rook (row, col, color){
  Piece.call(this, row, col, color);
  var baseImg = 'white' ? '2656' : '265C';
  this.img = unicodeify(baseImg);
}
Rook.prototype = new Piece();
Rook.prototype.getTargets = function(){
  var targets = [];
  for (var i = this.col; i >= 0; i--) {
    if (canMoveTo(this.row, i)) {
      targets.push({
        x: this.row,
        y: i
      });
    } else {
      break;
    }
  }
  for (var j = this.col; j <= 7; j++) {
    if (canMoveTo(this.row, j)) {
      targets.push({
        x: this.row,
        y: j
      });
    } else {
      break;
    }
  }
  for (var k = this.row; k >= 0; k--) {
    if (canMoveTo(k, this.col)) {
      targets.push({
        x: k,
        y: this.col
      });
    } else {
      break;
    }
  }
  for (var l = this.row; l <=7; l++) {
    if (canMoveTo(l, this.col)) {
      targets.push({
        x: l,
        y:this.col
      });
    } else {
      break;
    }
  }
  return targets;
};

function Bishop (row, col, color){
  Piece.call(this, row, col, color);
  var baseImg = 'white' ? '2657' : '265D';
  this.img = unicodeify(baseImg);
}
Bishop.prototype = new Piece();
Bishop.prototype.getTargets = function(){
  var targets = [];
  var dirs = {
    ul : true,
    ur : true,
    dl : true,
    dr : true
  };
  for (var i = 1; i < 5; i++) {
    if (dirs.ul && canMoveTo(row - i, col - i)) {
      targets.push({
        x: row - i,
        y: col - i,
      });
      if (isEnemy(this.row - i, this.col - i)) {
        dirs.ul = false;
      }
    } else {
      dirs.ul = false;
    }
    if (dirs.ur && canMoveTo(this.row - i, this.col + i)) {
      targets.push({
        x: row - i,
        y: col + i,
      });
      if (isEnemy(this.row - i, this.col + i)) {
        dirs.ur = false;
      }
    } else {
      dirs.ur = false;
    }
    if (dirs.dl && canMoveTo(this.row + i, this.col - i)) {
      targets.push({
        x: row + i,
        y: col - i
      });
      if (isEnemy(this.row + i, this.col - i)) {
        dirs.dl = false;
      }
    } else {
      dirs.dl = false;
    }
    if (dirs.dr && canMoveTo(this.row + i, this.col + i)) {
      targets.push({
        x: row + i,
        y: col + i
      });
      if (isEnemy(this.row + i, this.col + i)) {
        dirs.dr = false;
      }
    } else {
      dirs.dr = false;
    }
  }
  return targets;
};

function Queen (row, col, color){
  Piece.call(this, row, col, color);
  var baseImg = 'white' ? '2655' : '265B';
  this.img = unicodeify(baseImg);
}
Queen.prototype = new Piece();
Queen.prototype.getTargets = function(){
  var targetsB = Bishop.prototype.getTargets.call(this);
  var targetsR = Rook.prototype.getTargets.call(this);
  return targetsB.concat(targetsR);
};

function Knight (row, col, color){
  Piece.call(this, row, col, color);
  var baseImg = 'white' ? '2658' : '265E';
  this.img = unicodeify(baseImg);
}
Knight.prototype = new Piece();
Knight.prototype.getTargets = function(){
  var targets = [];
  for (var i = -2; i <= 2; i++) {
    if (Math.abs(i) === 2) {
      column = 1;
    } else if (Math.abs(i) === 1) {
      column = 2;
    }
    if (canMoveTo(i, column)) {
      targets.push({
        x: i,
        y: column
      });
    }
    if (canMoveTo(i, (column * -1))) {
      targets.push({
        x: i,
        y: (column * -1)
      });
    }
  }
  return targets;
};

function Pawn (row, col, color, dir){
  this.hasMoved = false;
  this.dir = dir;
  Piece.call(this, row, col, color);
  var baseImg = 'white' ? '2659' : '265F';
  this.img = unicodeify(baseImg);
}
Pawn.prototype = new Piece();
Pawn.prototype.getTargets = function() {
  var targets = [];
  var dir = this.color === 'black' ? 1 : -1;
  if (isEmpty(this.row + 1, this.col)) {
    targets.push({
      x: this.col,
      y: this.row + dir
    });
  }
  if (!this.hasMoved && isEmpty(this.row + 1, this.col)) {
    targets.push({
      x: this.col,
      y: this.row + 2 * dir
    });
  }
};

function unicodeify (str){
  return String.fromCharCode(parseInt(str, 16));
}

function canMoveTo(x, y){
  var cell = getCell(x, y);
  return (isOnBoard(x, y) && (isEmpty(cell) || isEnemy(x, y)));
}
function isOnBoard(x, y){
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}
function isEmpty(cell){
  return !cell;
}
function isEnemy(x, y) {
  var cell = getCell(x, y);
  if (isEmpty(cell) || currTurn === cell.color) {
    return false;
  }else {
    return true;
  }
}
function getCell(x, y){
  return board[x][y];
}
