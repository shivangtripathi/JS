let counter = 0;;
let undoStack = [];
let redoStack = [];

let historyList = document.getElementsByClassName('list')[0];
let undoButton = document.getElementById('undo-btn');
let redoButton = document.getElementById('redo-btn');

function handleClick(val) {
    counter += val;
    undoStack.push([ val, counter-val, counter ]);
    document.getElementsByTagName('h5')[0].innerText = counter;
    handleStackPush();
}

function handleUndo() {
    let len = undoStack.length
    let val = undoStack[len - 1][0];
    redoStack.push(undoStack[len-1]);
    undoStack.pop();
    counter -= val;
    document.getElementsByTagName('h5')[0].innerText = counter;
    handleStackPush(0);
    if (undoStack.length == 0) {
            undoButton.style.backgroundColor = '#d8d8d8';
            undoButton.style.cursor = "not-allowed";
    }
    if (redoStack.length > 0) {
        redoButton.style.backgroundColor = 'rgba(70, 130, 180, 0.5)';
        redoButton.style.cursor = "pointer";
    }
}


//1 -4 -3
function handleRedo() {
    if (redoStack.length > 0) {
        let rlen = redoStack.length;
        let val = redoStack[rlen - 1][0];
        undoStack.push(redoStack[rlen - 1]);
        redoStack.pop();
        counter += val;
        document.getElementsByTagName('h5')[0].innerText = counter;
        if (redoStack.length == 0) {
            redoButton.style.backgroundColor = '#d8d8d8';
            redoButton.style.cursor = "not-allowed";
        }
        handleStackPush();
        
    }
}



function handleStackPush(idx = 10) {
    if (undoStack.length > 0) {
        undoButton.style.backgroundColor = 'rgba(70, 130, 180, 0.5)';
        undoButton.style.cursor = "pointer";
    }
    let stackIndex = undoStack.length - 1;
    if (idx == 0) {
        historyList.removeChild(historyList.childNodes[idx]); 
        return;
    }
    if (stackIndex === 10) {
        historyList.removeChild(historyList.childNodes[idx]); 
    }
    let newEntryListNode = document.createElement('li');
    let newEntryTextNode = document.createElement('p');
    newEntryTextNode.innerHTML = `${undoStack[stackIndex][0]} &emsp; ( &nbsp; ${undoStack[stackIndex][1]} &nbsp; -> &nbsp; ${undoStack[stackIndex][2]} &nbsp; )`;
    newEntryListNode.appendChild(newEntryTextNode);
    historyList.insertBefore(newEntryListNode, historyList.firstChild);
}


//create undo stack



//create redo stack