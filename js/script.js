(function(){
	
	//Array
	var images = [];
	var flippedCards = [];
 	
 	//Variavel que guarda o elemento com a id do modal
	var modalGameOver = document.querySelector("#modalGameOver");
	var imgMatchSign = document.querySelector("#imgMatchSign");
	var matches = 0;

	for(var i=0; i < 16; i++){

		//Criando um objeto, usar {} significa que é um objeto
		var img = {
			src:"img/"+ i +".jpg",
			id: i%8
		};

		//Colocando o objeto no array
		images.push(img);
	}

	//Iniciando o game
	startGame();

	//Iniciar o game
	function startGame(){
		matches = 0;

		flippedCards = [];
		//Embaralhando as cartas
		images = randomSort(images);

		//Colocando as div com a classe front/back em uma variavel
		var frontFaces = document.getElementsByClassName("front");
		var backFaces = document.getElementsByClassName("back");
		
		//Organizar as cartas
		for(i=0; i < 16; i++){

			frontFaces[i].classList.remove("flipped","match");
			backFaces[i].classList.remove("flipped","match");

			//querySelector igual a document.getElementById (mais rápido?)
			var card = document.querySelector("#card" + i); 

			//mudando o css da class card, com um if inline ?(SESIM) :(SENAO)
			card.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 165 + 5 + "px"; 
			card.style.top = i < 8 ? 5 + "px" : 250 + "px";

			card.addEventListener("click",flipCard,false);

			//Colocando as imagens no background das div com a classe front
			frontFaces[i].style.background = "url('"+ images[i].src +"')";
			//Pegando as imagens das div e setando um atributo id nelas
			frontFaces[i].setAttribute("id",images[i].id);
		}

		//Após os comandos de iniciar o game, tiramos o modal da tela e tiramos o evento
		modalGameOver.style.display = "none";
		modalGameOver.removeEventListener("click",startGame,false);
	}

	//Embaralhando as cartas
	function randomSort(oldArray){

		var newArray = [];

		while(newArray.length !== oldArray.length){
			var i = Math.floor(Math.random()*oldArray.length);

			if(newArray.indexOf(oldArray[i]) < 0){
				newArray.push(oldArray[i]);
			}
		}

		return newArray;

	}

	//Virar a carta
	function flipCard(){
		//Verifica se o array tem menos que dois objetos se tiver ele vira a carta clicada
		//Se tiver mais de dois ele vira as duas cartas que já foram clicadas e limpa o array
		if(flippedCards.length < 2){
			
			//Variavel que vai guardar todos os elementos com a tag de class face
			var faces = this.getElementsByClassName("face");

			//Se tiver mais de 3 classes significa que ela tem o flipped e já está virada
			//vai impedir de ficar virando e desvirando a mesma carta
			if(faces[0].classList.length > 2){
				return;
			}

			//Toggle vai adicionar a classe flipped se não existir e retirar ela causo exista após clicar
			faces[0].classList.toggle("flipped");
			faces[1].classList.toggle("flipped");

			//Adicionando a carta clicada ao array
			flippedCards.push(this);

			if(flippedCards.length === 2){
				if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
					flippedCards[0].childNodes[1].classList.toggle("match");
					flippedCards[0].childNodes[3].classList.toggle("match");
					flippedCards[1].childNodes[1].classList.toggle("match");
					flippedCards[1].childNodes[3].classList.toggle("match");
					
					matchCardSign();

					matches++;

					flippedCards = [];

					if(matches === 8){
						gameOver();
					}
				}	
			}
		}else{

			flippedCards[0].childNodes[1].classList.toggle("flipped");
			flippedCards[0].childNodes[3].classList.toggle("flipped");
			flippedCards[1].childNodes[1].classList.toggle("flipped");
			flippedCards[1].childNodes[3].classList.toggle("flipped");

			flippedCards = [];
		}
	}

	function matchCardSign(){
		imgMatchSign.style.zIndex = 1;
		imgMatchSign.style.top = 150 + "px";
		imgMatchSign.style.opacity =0;
		setTimeout(function(){
			imgMatchSign.style.zIndex = -1;
			imgMatchSign.style.top = 250 + "px";
			imgMatchSign.style.opacity = 1;
		},2500);
	}

	function gameOver(){
		modalGameOver.style.display = "block";
		modalGameOver.addEventListener("click",startGame,false);
	}
}());