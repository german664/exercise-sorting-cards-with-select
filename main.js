let drawButton = document.querySelector("#draw-button");
let sortButton = document.querySelector("#sort-button");
let cardDeck = document.getElementById("cardDeck");
let bubbleDeck = document.getElementById("bubbleDeck");
let cardsToSort = [];

// GENERAR UN CONTENIDO RANDOM
let randomCard = () => {
    let cardsSuits = ["spades", "hearts", "diamonds", "cubs"];
    let randomN = Math.floor(Math.random() * 12) + 1;
    let randomCS = Math.floor(Math.random() * cardsSuits.length);
    let content = {
        number: randomN,
        suit: cardsSuits[randomCS]
    }
    cardsToSort.push(content)
    return content
}

// CREAR LA ESTRUCTURA DE LA CARTA EN EL HTML

let createCard = (obj, div) => {
    let carta = document.createElement("div");
    let numero = document.createElement("p");
    let cardContent = obj;
    carta.classList.add("card")
    numero.classList.add("number")

    if (cardContent.number === 1) {
        numero.innerHTML = "A";
    } else if (cardContent.number === 10) {
        numero.innerHTML = "J";
    } else if (cardContent.number === 11) {
        numero.innerHTML = "Q";
    } else if (cardContent.number === 12) {
        numero.innerHTML = "K";
    } else {
        numero.innerHTML = cardContent.number;
    }

    numero.classList.add(cardContent.suit)
    carta.appendChild(numero);
    div.appendChild(carta)
}

// BORRA LAS CARTAS QUE HAYAN SIDO CREADAS

let eraseContent = () => {
    let cardTotal = document.querySelectorAll(".card");
    let bubbleLogs = document.querySelectorAll("p");
    cardTotal.forEach(el => {
        el.remove()
    })
    bubbleLogs.forEach(el => {
        el.remove()
    })
    cardsToSort = []
}

// GENERA LA CARTA CON EL INPUT DEL USUARIO Y LOS DATOS DE CREATECARD Y RANDOMCARD

let generateCard = () => {

    let numCartas = parseInt(document.querySelector(".numCartas").value);
    if (!Number.isNaN(numCartas)) {
        if (cardsToSort.length > 0) {
            eraseContent()
        }
        for (let i = 0; i < numCartas; i++) {
            createCard(randomCard(), cardDeck);
        }
        console.log(cardsToSort)
    } else {
        alert("Debe ingresar un numero");
    }
    document.querySelector(".numCartas").value = "";
}


let sortArray = (arr) => {
    let min = 0;



    while (min < arr.length - 1) {
        let log = document.createElement("p");
        log.innerHTML = numberOfTry;
        bubbleDeck.appendChild(log)
        for (let j = 0; j < arr.length; j++) {
            createCard(arr[j], bubbleDeck)

        }
        for (let i = min + 1; i < arr.length - 1; i++) {
            if (arr[min] > arr[i]) {
                let aux = arr[min];
                arr[min] = arr[i];
                arr[i] = aux;
            }
        }
        min++;
    }
    return arr;
};



let sortCards = () => {
    let newCardSet = sortArray(cardsToSort);

    if (newCardSet.length > 0) {

        let cardTotal = document.querySelectorAll("#cardDeck > .card");
        cardTotal.forEach(el => {
            el.remove()
        })

        for (let i = 0; i < newCardSet.length; i++) {
            createCard(newCardSet[i], cardDeck);
        }



    } else {
        alert("No hay cartas para ordenar. Por favor presiona el boton de repartir")
    }

}

drawButton.addEventListener("click", generateCard)
sortButton.addEventListener("click", sortCards)