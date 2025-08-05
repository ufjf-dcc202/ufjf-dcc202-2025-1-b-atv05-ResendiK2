document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const messageEl = document.getElementById("message");
  const resetButton = document.getElementById("reset-button");

  let boardState = [];
  let selectedPieceIndex = -1;

  const initialState = [
    "black",
    "black",
    "black",
    "empty",
    "white",
    "white",
    "white",
  ];
  const finalState = [
    "white",
    "white",
    "white",
    "empty",
    "black",
    "black",
    "black",
  ];

  function initializeGame() {
    boardState = [...initialState];
    selectedPieceIndex = -1;
    messageEl.textContent = "";
    renderBoard();
  }

  function renderBoard() {
    gameBoard.innerHTML = "";
    boardState.forEach((piece, index) => {
      const slot = document.createElement("div");
      slot.classList.add("slot");
      slot.dataset.index = index;

      const pieceDiv = document.createElement("div");
      if (piece !== "empty") {
        pieceDiv.classList.add("piece", piece);
      } else {
        slot.classList.add("empty");
      }

      slot.appendChild(pieceDiv);
      slot.addEventListener("click", () => handleSlotClick(index));
      gameBoard.appendChild(slot);
    });
  }

  function handleSlotClick(index) {
    if (selectedPieceIndex === -1) {
      if (boardState[index] !== "empty") {
        selectedPieceIndex = index;
      }
    } else {
      if (isValidMove(selectedPieceIndex, index)) {
        movePiece(selectedPieceIndex, index);
        selectedPieceIndex = -1;
        checkWinCondition();
      } else {
        selectedPieceIndex = -1;
      }
    }
    renderBoard();
  }

  function isValidMove(fromIndex, toIndex) {
    if (boardState[toIndex] !== "empty") return false;

    const pieceColor = boardState[fromIndex];
    const distance = toIndex - fromIndex;

    if (pieceColor === "black") {
      if (distance !== 1 && distance !== 2) return false;
      if (distance === 2) {
        const jumpedPiece = boardState[fromIndex + 1];
        return jumpedPiece === "white";
      }
      return true;
    }

    if (pieceColor === "white") {
      if (distance !== -1 && distance !== -2) return false;
      if (distance === -2) {
        const jumpedPiece = boardState[fromIndex - 1];
        return jumpedPiece === "black";
      }
      return true;
    }

    return false;
  }

  function movePiece(fromIndex, toIndex) {
    boardState[toIndex] = boardState[fromIndex];
    boardState[fromIndex] = "empty";
  }

  function checkWinCondition() {
    if (JSON.stringify(boardState) === JSON.stringify(finalState)) {
      messageEl.textContent = "Parabéns, você venceu!";
    }
  }

  resetButton.addEventListener("click", initializeGame);

  initializeGame();
});
