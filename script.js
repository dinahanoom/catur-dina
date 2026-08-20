document.addEventListener("DOMContentLoaded", function () {
  const cells = Array.from(document.querySelectorAll(".cell"));
  const status = document.getElementById("status");
  const scoreXEl = document.getElementById("scoreX");
  const scoreOEl = document.getElementById("scoreO");
  const playerX = document.getElementById("playerX");
  const playerO = document.getElementById("playerO");
  const newGame = document.getElementById("newGame");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;
  let scoreX = 0;
  let scoreO = 0;

  const winningPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  function updateTurnUI() {
    playerX.classList.toggle("active", currentPlayer === "X");
    playerO.classList.toggle("active", currentPlayer === "O");
  }

  function setStatus(text) {
    status.textContent = text;
  }

  function checkResult() {
    for (const pattern of winningPatterns) {
      const [a,b,c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], pattern };
      }
    }

    if (board.every(cell => cell !== "")) {
      return { draw: true };
    }

    return null;
  }

  function play(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    const cell = cells[index];
    cell.textContent = currentPlayer;
    cell.classList.add("filled", currentPlayer.toLowerCase());

    const result = checkResult();

    if (result) {
      gameActive = false;

      if (result.winner) {
        result.pattern.forEach(i => cells[i].classList.add("winner"));

        if (result.winner === "X") {
          scoreX++;
          scoreXEl.textContent = scoreX;
        } else {
          scoreO++;
          scoreOEl.textContent = scoreO;
        }

        setStatus("♛ Pemain " + result.winner + " Menang!");
      } else {
        setStatus("✦ Permainan Seri ✦");
      }

      updateTurnUI();
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    setStatus("Giliran Pemain " + currentPlayer);
    updateTurnUI();
  }

  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("filled", "x", "o", "winner");
    });

    setStatus("Giliran Pemain X");
    updateTurnUI();
  }

  cells.forEach(cell => {
    cell.addEventListener("click", function () {
      play(Number(cell.dataset.index));
    });
  });

  newGame.addEventListener("click", resetBoard);

  updateTurnUI();
});
