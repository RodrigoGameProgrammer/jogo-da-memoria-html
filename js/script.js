(function(){
	startGame();

	//Iniciar o game
	function startGame(){
		//Organizar as cartas
		for(i=0; i < 16; i++){
			var card = document.querySelector("#card" + i); //querySelector igual a document.getElementById (mais rápido?)
			//mudando o css da class card, com um if inline ?(SESIM) :(SENAO)
			card.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 165 + 5 + "px"; 
			card.style.top = i < 8 ? 5 + "px" : 250 + "px";

			card.addEventListener("click",flipCard,false);
		}
	}

	function flipCard(){
		//toggle vai adicionar a classe flipped se não existir e retirar ela causo exista
		var faces = this.getElementsByClassName("face");
		faces[0].classList.toggle("flipped");
		faces[1].classList.toggle("flipped");
		console.log(faces[0]);
	}
}());