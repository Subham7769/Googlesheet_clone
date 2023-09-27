const header = document.getElementById("header");
const gridBody = document.getElementById("gridBody");

// creating the header of grid
for (var i = 64; i <= 110; i++) {
  // first cell to be greyed
   if (i === 64) {
    const bold = document.createElement("b");
    bold.style.backgroundColor = "lightgrey";
    header.appendChild(bold);
   }
  //  creating all the cells with A-Z leveling
   else{
    let char = String.fromCharCode(i);
    const bold = document.createElement("b");
    bold.innerText = char;
    header.appendChild(bold);
   }
}

// inside each row we are to create 1+26 cells first cell for numbering
for (let i = 1; i <= 100; i++) {
  rowCreation(i);
}

function rowCreation(rowNumber) {
  const row = document.createElement("div");
  row.className = "row";
  for (var i = 64; i<= 90; i++) {
    if (i === 64) {
      // create first cell for numbering
      const b = document.createElement("b");
      b.innerText = rowNumber;
      row.appendChild(b);
    } else {
      // empty cell after numbering cell
      const cell = document.createElement("div");
      cell.id = `${String.fromCharCode(i)}${rowNumber}`;
      // make this cell text editable so we can write inside it
      cell.contentEditable = "true";
      // while we write & press enter, inside it a new cell<div> block level element is created
      // so make it editable once only
      cell.addEventListener("focus", onCellFocus);
      row.appendChild(cell);
    }
  }
  gridBody.appendChild(row);
}



// ***************************************************************************
// we manage the options selection

const activeCellElement = document.getElementById("active-cell");

// activeCell defines which cell is selected / active.
// intially it will null indicating that no cell is selected.
let activeCell = null;

const intialOptionsState = {
  fontFamily: "",
  isBoldSelected: false,
  isItalicSelected: false,
  isUnderLineSelected: false,
  textAlign: "left", // it can have 'left' | 'center' | 'right'
  textColor: "#000",
  backgroundColor: "#fff",
  fontSize: 14,
};

// below function will be triggered whenever cell is focused.
function onCellFocus(e) {
  // whenever a cell is focused change the activeCell value to be the id of cell.
  activeCell = e.target.id;
  activeCellElement.innerText = activeCell;
}