const butao = document.querySelector("#button");
const novoAfazer = document.querySelector("#newTodo");
const lista = document.querySelector("#addItems");


butao.addEventListener("click", () => {
    const novaCor = gerarCor();
    const li = document.createElement('li');
    li.innerHTML = novoAfazer.value;
    li.style.color = novaCor;
    lista.append(li);
    novoAfazer.value = '';
})

gerarCor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`
}

forOf = (palavra) => {
    var i = 0;
    for (let letra of palavra) {
        var newElemento = document.createElement('span')
        newElemento.innerHTML = letra
        newElemento.style.color = "hsl(" + (360 * (i) / palavra.length) + ",80%,50%)"
        document.body.appendChild(newElemento)
        i++
    }
    document.body.appendChild(document.createElement('br'))
}