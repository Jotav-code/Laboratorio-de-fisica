// Declaração das variáveis globais para armazenar o número de linhas e colunas da matriz
let lineVector, vectorColumn;

// Função principal que cria a matriz de inputs com base no número de linhas e colunas informados
const confirmar = () => {
    // Obtém o número de linhas e colunas dos inputs do HTML
    lineVector = Number(document.getElementById('inputLine').value);
    vectorColumn = Number(document.getElementById('inputColumn').value);

    // Seleciona o elemento HTML onde os inputs da matriz serão renderizados
    let result = document.getElementById("res");
    result.innerHTML = ''; // Limpa o conteúdo anterior

    // Loop para criar as linhas da matriz
    for (let i = 0; i < lineVector; i++) {
        // Cria um div para agrupar os inputs de cada linha
        let lineDiv = document.createElement('div');

        // Loop para criar os inputs de cada coluna na linha atual
        for (let j = 0; j < vectorColumn; j++) {
            // Cria um input do tipo número
            let input = document.createElement('input');
            input.type = 'number';
            input.placeholder = `a${i + 1}${j + 1}`; // Placeholder com identificação da posição (ex: a11, a12, etc.)
            input.id = `a${i + 1}${j + 1}`; // Define o ID do input com base na posição
            input.className = 'inputMatriz'; // Adiciona uma classe para estilização
            lineDiv.appendChild(input); // Adiciona o input ao div da linha
            console.log(input); // Exibe o input no console (para debug)
        }

        result.appendChild(lineDiv); // Adiciona a linha completa ao resultado
    }

    // Cria um botão para confirmar os valores da matriz e calcular as estatísticas
    let button = document.createElement('button');
    button.className = 'button2'; // Adiciona uma classe para estilização
    button.innerText = 'Confirmar'; // Texto do botão
    button.onclick = confirmar2; // Define a função a ser chamada ao clicar no botão
    result.appendChild(button); // Adiciona o botão ao resultado
    document.getElementById('res2').innerHTML = ''
};

// Função que calcula as estatísticas (soma, média, desvio padrão e incerteza do tipo A)
const confirmar2 = () => {
    let somaDasLinhas = []; // Armazena a soma de cada linha
    let valoresDasLinhas = []; // Armazena os valores de cada linha como arrays separados
    let mediasDasLinhas = []; // Armazena as médias de cada linha
    let desviosPadrao = []; // Armazena os desvios padrão de cada linha
    let incertezaTipoA = []; // Armazena as incertezas do tipo A de cada linha

    // Loop para percorrer as linhas da matriz
    for (let i = 0; i < lineVector; i++) {
        let somaLinha = 0; // Soma dos valores da linha atual
        let valoresLinha = []; // Valores da linha atual

        // Loop para percorrer as colunas da linha atual
        for (let j = 0; j < vectorColumn; j++) {
            // Obtém o valor do input correspondente à posição (i+1, j+1)
            let input = Number(document.getElementById(`a${i + 1}${j + 1}`).value);
            valoresLinha.push(input); // Adiciona o valor ao array da linha atual
            somaLinha += input; // Soma o valor ao total da linha
        }

        somaDasLinhas.push(somaLinha); // Armazena a soma da linha no array de somas
        valoresDasLinhas.push(valoresLinha); // Armazena os valores da linha no array de valores
        mediasDasLinhas.push(somaLinha / vectorColumn); // Calcula e armazena a média da linha
    }

    // Cálculo do desvio padrão para cada linha
    for (let k = 0; k < valoresDasLinhas.length; k++) {
        let somaDosQuadrados = 0; // Soma dos quadrados das diferenças em relação à média

        // Loop para calcular a soma dos quadrados das diferenças
        for (let l = 0; l < valoresDasLinhas[k].length; l++) {
            somaDosQuadrados += Math.pow(valoresDasLinhas[k][l] - mediasDasLinhas[k], 2);
            console.log('Soma dos quadrados', somaDosQuadrados); // Exibe a soma parcial no console
            console.log('valores do vetor das linhas k', valoresDasLinhas[k]); // Exibe os valores da linha atual
            console.log('valores do vetor L das linhas', valoresDasLinhas[l]); // Exibe os valores da coluna atual
        }

        // Calcula o desvio padrão da linha atual (usando n-1 para amostras)
        let desvioPadrao = Math.sqrt(somaDosQuadrados / (vectorColumn - 1));
        desviosPadrao.push(desvioPadrao); // Armazena o desvio padrão no array
    }

    // Cálculo da incerteza do tipo A para cada linha
    for (let m = 0; m < desviosPadrao.length; m++) {
        let incertezaTipoAOperacao = desviosPadrao[m] / Math.sqrt(vectorColumn);
        incertezaTipoA.push(incertezaTipoAOperacao); // Armazena a incerteza no array
    }

    // Exibe os resultados no console
    console.log("A incerteza do tipo A é", incertezaTipoA);
    console.log("Soma das linhas:", somaDasLinhas);
    console.log("Valores das linhas:", valoresDasLinhas);
    console.log("Médias das linhas:", mediasDasLinhas);
    console.log("Desvios padrão das linhas:", desviosPadrao);

    // Seleciona o elemento HTML onde os resultados serão exibidos
    let resultado = document.getElementById('res2');
    resultado.innerHTML = ''; // Limpa o conteúdo anterior de res2

    // Loop para exibir os resultados de cada linha na página
    for (let n = 0; n < lineVector; n++) {
        // Cria um div para agrupar os resultados de cada linha
        let divline = document.createElement('div');
        divline.style.margin = '10px'; // Adiciona margem ao div

        // Cria um parágrafo para exibir os resultados da linha atual
        let res2 = document.createElement('p');
        res2.style.backgroundColor = 'lightgrey'; // Define a cor de fundo
        res2.style.color = 'black'; // Define a cor do texto
        res2.style.border = 'solid black 2px'; // Adiciona uma borda
        res2.style.fontFamily = 'arial'; // Define a fonte
        res2.style.fontSize = '30px'; // Define o tamanho da fonte
        res2.style.borderRadius = '9px'; // Adiciona bordas arredondadas
        res2.style.textAlign = 'center'; // Centraliza o texto

        // Preenche o parágrafo com os resultados da linha atual
        res2.innerHTML = `<strong>O resultado da linha</strong> ${n + 1} é: Incerteza do tipo A: ${incertezaTipoA[n]} Média: ${mediasDasLinhas[n]}, Desvio padrão: ${desviosPadrao[n]} `;
        divline.appendChild(res2); // Adiciona o parágrafo ao div da linha

        resultado.appendChild(divline); // Adiciona o div da linha ao resultado
    }
};
