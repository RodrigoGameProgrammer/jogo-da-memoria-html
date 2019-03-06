(function(){
	
	//Array
	var images=[];

	for(var i=0; i < 16; i++){

		//Criando um objeto, usar {} significa que é um objeto
		var img = {
			src:"img/"+ i +".jpg",
			id: i%8
		};

		//Colocando o objeto no array
		images.push(img);
	}

	console.log(images);
	//Iniciando o game
	startGame();

	//Iniciar o game
	function startGame(){
		//Embaralhando as cartas
		images = randomSort(images);

		//Colocando as div com a classe front em uma variavel
		var frontFaces = document.getElementsByClassName("front");
		
		//Organizar as cartas
		for(i=0; i < 16; i++){

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
		//Toggle vai adicionar a classe flipped se não existir e retirar ela causo exista
		var faces = this.getElementsByClassName("face");
		faces[0].classList.toggle("flipped");
		faces[1].classList.toggle("flipped");
		console.log(faces[0]);
	}
}());