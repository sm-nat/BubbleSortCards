import "bootstrap";
import "./style.css";

window.onload = () => {
  const drawButton = document.getElementById("draw");
  const sortButton = document.getElementById("sort");
  const inputNumber = document.getElementById("inputNumber");
  const cardContainer = document.getElementById("cardContainer");
  const sortcontainer = document.getElementById("sortSteps");
  const restartButton = document.getElementById("restartButton");

  const generarRandomNumero = () => {
    const numbers = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K"
    ];
    return numbers[Math.floor(Math.random() * numbers.length)];
  };

  const generarRandomPinta = () => {
    const pintas = ["heart", "club", "diamond", "spade"];
    return pintas[Math.floor(Math.random() * pintas.length)];
  };
  // crear la carta
  let cardData = [];
  const generarCarta = () => {
    cardData = [];
    const numberOfCards = parseInt(inputNumber.value);

    for (let i = 0; i < numberOfCards; i++) {
      const pinta = generarRandomPinta();
      const number = generarRandomNumero();
      cardData.push({ pinta, number });

      const card = document.createElement("div");
      card.classList.add("card", pinta);

      const numero = document.createElement("div");
      numero.classList.add("numero");
      numero.innerText = number;
      card.appendChild(numero);

      // card.appendChild(numero);
      cardContainer.appendChild(card);
    }
  };

  const dibujarCarta = step => {
    const { number, pinta } = step;
    const card = document.createElement("div");
    card.classList.add("card", pinta);

    const numero = document.createElement("div");
    numero.classList.add("numero");
    numero.innerText = number;
    card.appendChild(numero);
    return card;
  };

  // algoritmo de burbuja
  const bubbleSort = () => {
    let n = cardData.length;
    let steps = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (cardData[j].number > cardData[j + 1].number) {
          // Intercambia las cartas
          const temp = cardData[j];
          cardData[j] = cardData[j + 1];
          cardData[j + 1] = temp;
        }
        steps.push([...cardData]);
      }
    }
    cardData = steps[steps.length - 1];

    steps.forEach((step, index) => {
      const stepDiv = document.createElement("div");
      stepDiv.classList.add("step");

      // Agrega el número de pasos
      const stepNumber = document.createElement("span");
      stepNumber.classList.add("step-number");
      stepNumber.textContent = `Step ${index + 1}: `;
      stepDiv.appendChild(stepNumber);

      // Agrega las cartas
      step.forEach(cardInfo => {
        const carta = dibujarCarta(cardInfo);
        stepDiv.appendChild(carta);
      });

      sortcontainer.appendChild(stepDiv);
    });
  };
  // restaurar
  const restart = () => {
    inputNumber.value = "";
    cardData = [];
    cardContainer.innerHTML = "";
    sortcontainer.innerHTML = "";
  };

  drawButton.addEventListener("click", generarCarta);
  sortButton.addEventListener("click", bubbleSort);
  restartButton.addEventListener("click", restart);
};
