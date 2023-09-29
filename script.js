const header = document.getElementById("header");
const body = document.getElementById("body");

// first create the First row of A B C D in the "header div"
// A=>65 to Z=>90 including "S.No."
for (let i = 64; i <= 90; i++) {
  if (i == 64) {
    const bold = document.createElement("b");
    bold.innerText = "S.No.";
    header.appendChild(bold);
  } else {
    const bold = document.createElement("b");
    bold.innerText = String.fromCharCode(i);
    header.appendChild(bold);
  }
}

// create 100 rows call the `createAndAppendRow` function for 100 times.
for (let rowNumber = 1; rowNumber <= 100; rowNumber++) {
  createAndAppendRow(rowNumber);
}

//create a new row & inside it append the newly created cells then append this row in to the body
function createAndAppendRow(rowNumber) {
  const row = document.createElement("div");
  row.className = "row"; // <div class="row"></div>

  // inside each row we should create 1(Numbers) + 26(A-Z) cells
  for (let i = 64; i <= 90; i++) {
    if (i === 64) {
      // This is first cell represents the S.No=>1 2 3
      const b = document.createElement("b");
      b.innerText = rowNumber;
      row.appendChild(b);
    } else {
      // This represents the empty cell for (A-Z cols)
      const cell = document.createElement("div");
      cell.id = `${String.fromCharCode(i)}${rowNumber}`; // dynamic and unique id. COLROW => examples: C7, M8, A3
      cell.contentEditable = "true";
      cell.addEventListener("focus", onCellFocus);
      row.appendChild(cell);
    }
  }
  body.appendChild(row);
}
// **********************************************functionality on cells*****************************************
// activeCell defines which cell is selected / active.
// initially it will null indicating that no cell is selected.
let activeCell = null;
const activeCellDisplayElement = document.getElementById("active-cell-display");
let activeCellState;

// below function will be triggered whenever cell is focused.
function onCellFocus(event) {
  // whenever a cell is focused change the activeCell value to be the id of cell.
  if (activeCell && activeCell.id === event.target.id) {
    // previously selected cell is equal to the currently selected cell.
    return;
  }
  activeCell = event.target;
  activeCellDisplayElement.innerText = event.target.id;

  // initialize the state of this cell using activeCellState object.
  // activeCellState will take all the initial states of the active cell
  const activeCellComputedStyle = getComputedStyle(activeCell);
  activeCellState = {
    fontFamily: activeCellComputedStyle.fontFamily,
    // 400 === 600 -> false
    isBoldSelected: activeCellComputedStyle.fontWeight === "600",
    isItalicSelected: activeCellComputedStyle.fontStyle === "italic",
    isUnderLineSelected:
      activeCellComputedStyle.textDecoration.includes("underline"),
    textAlign: activeCellComputedStyle.textAlign,
    textColor: activeCellComputedStyle.color,
    backgroundColor: activeCellComputedStyle.backgroundColor,
    fontSize: activeCellComputedStyle.fontSize,
  };
  // menu style button
  highlightOptionButtonsOnFocus();
}

// *****************************functionality on cells & changes on options menu*************************************
// we manage the options selection

const textAlignmentButton = document.getElementsByClassName(
  "text-alignment-button"
);
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlinedButton = document.getElementById("underlined");

function highlightOptionButtonsOnFocus() {
  // check if the cell is in the bold state or not .
  toggleButtonsStyle(boldButton, activeCellState.isBoldSelected);

  // check if the selected cell is italic or not .
  toggleButtonsStyle(italicButton, activeCellState.isItalicSelected);

  // check if the selected cell is underline or not .
  toggleButtonsStyle(underlinedButton, activeCellState.isUnderLineSelected);

  //highlightTextAlignButtons("start" | "right" | "center")-> get the textAlign value from activeCellState.textAlign
  highlightTextAlignButtons(activeCellState.textAlign);
}
//  toggleButtonsStyle() function to toggle the class on button
// isSelected-> boolean value-> true of false
function toggleButtonsStyle(button, isSelected) {
  if (isSelected) {
    button.classList.add("active-option");
  } else {
    button.classList.remove("active-option");
  }
}

// the below function task is to take the textAlign value and decides which alignment button needs to highlighted or not.
function highlightTextAlignButtons(textAlignValue) {
  // textAlignValue === "left" => we have to highlight only left button
  // textAlignValue === "right" => we have to highlight only right button
  // textAlignValue === "center" => we have to highlight only center button
  for (let i = 0; i < textAlignmentButton.length; i++) {
    if (textAlignmentButton[i].getAttribute("data-value") === textAlignValue) {
      textAlignmentButton[i].classList.add("active-option");
    } else {
      textAlignmentButton[i].classList.remove("active-option");
    }
  }
}

// ***********************************************Adding functionality to the buttons*************************************************

function onClickBold(boldButton) {
  // this function will be triggered when user clicks on the Bold button.
  /**
   * 1. toggle `active-option` class for the button.
   * 2. Change the selected cell's text property's 'font-weight' value changed.
   * 3. update the initial state of the object's isBoldSelected property
   */
  boldButton.classList.toggle("active-option");

  if (activeCell) {
    if (activeCellState.isBoldSelected) {
      // the text already bold
      activeCell.style.fontWeight = "400";
    } else {
      // make the text to normal
      activeCell.style.fontWeight = "600";
    }

    // make the activeCell object isBoldSelected property changed true-false or vice-versa
    activeCellState.isBoldSelected = !activeCellState.isBoldSelected;
  }
}

function onClickItalic(italicButton) {
  /**
   * 1. toggle `active-option` class for the button.
   * 2. Change the selected cell's text property's 'font-style' value changed.
   * 3. update the initial state of the object's isItalicSelected property
   */
  italicButton.classList.toggle("active-option");

  if (activeCell) {
    if (activeCellState.isItalicSelected) {
      // the text already italic.
      activeCell.style.fontStyle = "normal";
    } else {
      activeCell.style.fontStyle = "italic";
    }

    // make the activeCell object 'isItalicSelected' property changed true-false or vice-versa
    activeCellState.isItalicSelected = !activeCellState.isItalicSelected;
  }
}

function onClickUnderline(underlinedButton) {
  /**
   * 1. toggle `active-option` class for the button.
   * 2. Change the selected cell's text property's 'font-Decoration' value changed.
   * 3. update the initial state of the object's 'isUnderLineSelected' property
   */
  underlinedButton.classList.toggle("active-option");

  if (activeCell) {
    if (activeCellState.isUnderLineSelected) {
      // if the text already underlined
      activeCell.style.textDecoration = "none";
    } else {
      activeCell.style.textDecoration = "underline";
    }

    // make the activeCell object 'isUnderLineSelected property' changed true-false or vice-versa
    activeCellState.isUnderLineSelected = !activeCellState.isUnderLineSelected;
  }
}

function onClickTextAlign(textAlignButton) {
  let selectedValue = textAlignButton.getAttribute("data-value");
  highlightTextAlignButtons(selectedValue);

  // change the text alignment.
  if (activeCell) {
    activeCell.style.textAlign = selectedValue;
    activeCellState.textAlign = selectedValue;
  }
}

function onChangeTextColor(textColorInput) {
  let selectedColor = textColorInput.value;
  if (activeCell) {
    activeCell.style.color = selectedColor;
    activeCellState.color = selectedColor;
  }
}

function onChangeBackgroundColor(textColorInput) {
  let selectedColor = textColorInput.value;
  if (activeCell) {
    activeCell.style.backgroundColor = selectedColor;
    activeCellState.backgroundColor = selectedColor;
  }
}

function onChangeFontFamily(fontFamilySelected) {
  let selectedValue = fontFamilySelected.value;
  if (activeCell) {
    activeCell.style.fontFamily = selectedValue;
    activeCellState.fontFamily = selectedValue;
  }
}

function onChangeFontSize(fontSizeSelected) {
  let selectedValue = Number(fontSizeSelected.value);
  if (activeCell) {
    activeCell.style.fontSize = selectedValue+"px";
    activeCellState.fontSize = selectedValue+"px";
  }
}
