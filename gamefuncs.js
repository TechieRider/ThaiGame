
    const board = [{id:1, value: 1},{id:2, value: 2}, {id:3, value: 3}, {id:4, value: 4}, {id:5, value: 5}, {id:6, value: 6}, {id:7, value: 7},{id:8, value: 8},{id:9, value: 9},{id:10, value: 10}]
    let diceResults = [];
    let tileArray = [];
    let diceIsRolled = false;
    const diff = (a, b) => b.filter((i) => a.indexOf(i) === -1);
    
    function randomNumber(){
        document.getElementById('instructionalLabel').innerHTML = 'Välj bricka';
        document.getElementById("playBtn").disabled = true;
        diceResults = [];
        var x = Math.floor((Math.random() * 6) + 1);
        document.getElementById("dice1").innerHTML = x;
        diceResults.push(x);

        var y = Math.floor((Math.random() * 6) + 1);
        document.getElementById("dice2").innerHTML = y;
        diceResults.push(y);
        diceIsRolled = true;
        renderBoard();
    }

    
    window.onload = function startTheGame(){
        this.emptyBoard();
    }

    function emptyBoard(){
        createTileArray();
        document.getElementById('instructionalLabel').innerHTML = 'Slå tärningen';
        var boardString = [];
         for(var i = 1; i < board.length + 1; i++){
                boardString.push('<div id=' + board[i -1].value + ' class="tile"> ' + board[i - 1].value +' </div>')     
        }
                
        boardStringify = boardString.join(' ');
        document.getElementById("board").innerHTML = boardStringify.toString();
    }

    function createTileArray(){
        tileArray = [];
        for(var i = 0; i < board.length; i++){
            tileArray.push(board[i].value)
        }
    }
    
    function renderBoard(){
        createTileArray();
        var boardString = [];
        let maxInt = 0;
         for(var i = 0; i < board.length; i++){
            if(diceResults[0] == board[i].value || diceResults[1] == board[i].value || (diceResults[0] + diceResults[1]) == board[i].value){
                maxInt++;
                boardString.push('<div id=' + board[i].value + ' onclick="choosenTile(this.id)" class="tiled"> ' + board[i].value +' </div>')
            }
             else {
                boardString.push('<div id=' + board[i].value + '  class="tile"> ' + board[i].value +' </div>')
            }
       }
       if(maxInt == 0 && diceIsRolled){
           console.log('Game over')
           document.getElementById('instructionalLabel').innerHTML = 'Game over!';
       }
        boardStringify = boardString.join(' ');
        document.getElementById("board").innerHTML = boardStringify.toString();
    }

    function choosenTile(tile){
        document.getElementById('instructionalLabel').innerHTML = 'Slå tärningen';
        var newArray = [];
        for(var i = 0; i < board.length; i++){
            if(board[i].value == tile) {
                board.splice(i, 1)
            }
        }
        
        for(var i = 0; i < board.length; i++){
            var obj = {id: (i + 1), value: board[i].value}
            newArray.push(obj);
        }
        if(newArray.length == 0){
            renderBoard();
            document.getElementById('instructionalLabel').innerHTML = 'Grattis, du har vunnit';
        } else {
            newArray = board;
            diceIsRolled = false;
            document.getElementById("playBtn").disabled = false;
            renderBoard();
        }
        
    }
