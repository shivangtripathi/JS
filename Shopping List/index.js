const API_URL_BASE = 'https://api.frontendeval.com/fake/food/';

const inputVal = document.getElementsByTagName('input')[0];
const suggestionListParent = document.getElementsByClassName('suggestions-list')[0];

const shopingListParent = document.getElementsByTagName('ul')[1];

let searchQuery = "";

let response = [];

inputVal.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        searchQuery += event.key;
        inputVal.value = searchQuery;
    } else if (event.key === 'Backspace') {
        let len = searchQuery.length;
        searchQuery = searchQuery.slice(0, len - 1);
        inputVal.value = searchQuery;
    }
    if (searchQuery.length > 1) {
        fetchData();
    }
    else {
        suggestionListParent.innerHTML = '';
    }
});

//debouncing 500ms
function debounce(fn, delay) {
    let timer;
    return function () {
        clearInterval(timer);
        let context = this;
        let args = arguments;
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay);
    }
}

const fetchData = debounce(_fetchDataFromApi, 500);

async function _fetchDataFromApi() {
    shopingListParent.style.visibility = "hidden";
    let res = await fetch(API_URL_BASE + searchQuery);
    let list = await res.json();
    suggestionListParent.innerHTML = '';
    for (let i = 0; i < Math.min(list.length, 10); i++){  //stripping off the suggested list to show max 10 elements
        let listItmNode = document.createElement('li');
        listItmNode.className = "suggestions-list-item";
        listItmNode.innerText = list[i];
        listItmNode.addEventListener('click', () => {
            addToShoppingList(list[i]);
            shopingListParent.style.visibility = "visible";
            suggestionListParent.innerHTML = '';
        })
        suggestionListParent.appendChild(listItmNode);
    };

}


const addToShoppingList = (itm) => {
    let shoppingListItmNode = document.createElement('li');
    shoppingListItmNode.className = "list-items";
    let tickButtonNode = document.createElement('p');
    tickButtonNode.id = "complete-button";
    tickButtonNode.innerText = '✓';
    let crossButtonNode = document.createElement('p');
    crossButtonNode.id = "remove-button";
    crossButtonNode.innerText = 'X';
    let textNode = document.createElement('p');
    textNode.innerText = itm;
    shoppingListItmNode.addEventListener('click', (event) => {
        if (event.originalTarget.id === 'complete-button') {
            event.target.parentNode.childNodes[1].style.textDecoration='line-through';
        } else if (event.originalTarget.id === 'remove-button') {
            let parentNode = event.target.parentNode;
            shopingListParent.removeChild(parentNode);
        }
        
    })
    shoppingListItmNode.appendChild(tickButtonNode);
    shoppingListItmNode.appendChild(textNode);
    shoppingListItmNode.appendChild(crossButtonNode);
    shopingListParent.appendChild(shoppingListItmNode);
}

let config = { attributes: false, childList: true };
let callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type === 'childList') {
            if (shopingListParent.childNodes.length > 0) {
                document.getElementsByClassName('sub-heading')[0].innerText = 'Items';
            } else {
                document.getElementsByClassName('sub-heading')[0].innerText = '';
            }
        }
    }
};
let observer = new MutationObserver(callback);
observer.observe(shopingListParent, config);
