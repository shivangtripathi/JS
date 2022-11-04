(async () => {
    const api_url = "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new";
    const res = await fetch(api_url);
    const val = await res.text();
    const numbers = val.trim().split('\n').map(Number);
    
    let numbersMap = {};
    numbers.forEach((itm, idx) => {
        if (numbersMap[itm]) numbersMap[itm]++;
        else numbersMap[itm] = 1;
    })

    
    const keys = Object.keys(numbersMap);
    const maxX = Math.max(...keys);
    const minX = Math.min(...keys);
    const maxY = Math.max(...Object.values(numbersMap));
    
    const container = document.getElementsByClassName('container')[0];
    for (let i = minX; i <= maxX; i++) {
        if (numbersMap[i]) {
            let newDiv = document.createElement('div');
            newDiv.className = "col";
            newDiv.style.height = (numbersMap[i]/maxY)*100 + '%';
            let xlabel = document.createElement('div');
            xlabel.className = "x-label";
            xlabel.innerText = i;
            newDiv.appendChild(xlabel);
            container.appendChild(newDiv);
        }
    }

    for (let i = 0; i <= maxY; i += 10){
        let newDiv = document.createElement('div');
        newDiv.className = "y-label";
        newDiv.innerText = i;
        newDiv.style.bottom = (i/maxY)*100 + '%';
        container.appendChild(newDiv);
    }
})();