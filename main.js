"use strict";

const btns = document.querySelectorAll(".btn");
const h3 = document.querySelector("h3");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");

let lastChar = ""; // Pour suivre le dernier caractère ajouté
let resultDisplayed = false; // Pour suivre si le résultat a été affiché

// Fonction pour ajouter des valeurs au champ de résultat
const appendToDisplay = (value) => {
  // Vérifie si la valeur est un opérateur ou un point
  const isOperator = /[\+\-\*\/]/.test(value);
  const isDot = value === ".";

  // Si le dernier caractère est un opérateur et on clique sur un autre, on ne fait rien
  if (isOperator && /[\+\-\*\/]/.test(lastChar)) {
    return; // Ne rien faire si c'est un opérateur
  }

  // Si le dernier caractère est un point et on clique sur un autre point, ne rien faire
  if (isDot && lastChar === ".") {
    return; // Ne rien faire si c'est un point
  }

  // Si l'utilisateur essaie d'ajouter un point après un opérateur sans chiffre, on ne fait rien
  if (isDot && (lastChar === "" || isOperator)) {
    return; // Ne rien faire si c'est un point après un opérateur ou au début
  }

  // Si on a affiché un résultat et que l'utilisateur clique sur un chiffre, on remplace le texte
  if (resultDisplayed && !isOperator) {
    h3.textContent = value; // Remplace le texte par le nouveau chiffre
    resultDisplayed = false; // Réinitialise le flag
  } else if (lastChar === "0" && !isOperator && value !== ".") {
    h3.textContent = h3.textContent.slice(0, -1) + value; // Remplace le zéro par le nouveau chiffre
  } else {
    h3.textContent += value; // Ajoute la valeur à l'affichage
  }

  lastChar = value; // Met à jour le dernier caractère
};

// Fonction pour évaluer l'expression
const evaluateExpression = () => {
  try {
    const result = eval(h3.textContent);
    h3.textContent = result;
    lastChar = ""; // Réinitialise lastChar après évaluation
    resultDisplayed = true; // Indique que le résultat a été affiché
  } catch (error) {
    h3.textContent = "Erreur!";
    console.error("Erreur d'évaluation:", error);
  }
};

// Fonction pour effacer l'affichage
const clearDisplay = () => {
  h3.textContent = "";
  lastChar = ""; // Réinitialise lastChar
  resultDisplayed = false; // Réinitialise le flag
};

// Écouteurs d'événements pour les boutons
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    appendToDisplay(btn.id);
  });
});

equal.addEventListener("click", evaluateExpression);
clear.addEventListener("click", clearDisplay);
