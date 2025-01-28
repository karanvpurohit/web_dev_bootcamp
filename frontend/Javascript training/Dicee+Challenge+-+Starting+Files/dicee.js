function shuffle(){
    var p1 = Math.floor(Math.random() * 6) + 1;
    var p2 = Math.floor(Math.random() * 6) + 1;
    var winner = 'Player 1'
    if(p1 === p2){
        winner = "Draw 🤷🏻‍♂️"
    }else if(p1 > p2){
        winner = " 🏆 Player 1 Wins"
    }else{
        winner = "Player 2 Wins 🏆"
    }
    // alert("p1 = "+p1+" and  p2 = "+p2);
    document.querySelector("#dice1").src = "./images/dice"+p1+".png";
    document.querySelector("#dice2").src = "./images/dice"+p2+".png";
    document.querySelector("#refresh").textContent = winner;
}