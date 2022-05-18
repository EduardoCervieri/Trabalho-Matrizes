function criarMatriz(linhas, colunas, random, type) {
    var matriz = [];
    for (var i = 0; i < linhas; i++) {
        matriz.push([]);
    }

    var valor = 100;
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (random) {
                matriz[i][j] = Math.ceil((Math.random() * (valor * 2)) - (valor));
            } else {
                if (type) {
                    matriz[i][j] = parseInt(prompt("Linha " + (i + 1) + " Coluna " + (j + 1)));
                } else {
                    matriz[i][j] = 0.0;
                }
            }
        }
    }
    return matriz;
}

function mostrarMatriz(matriz, titulo) {
    document.write("<table border=1 class=matriz>");
    document.write("<th colspan = " + matriz[0].length + ">" + titulo + "</th>");
    var linha = "";
    for (var i = 0; i < matriz.length; i++) {
        linha = linha + "<tr class=matriz>";
        for (var j = 0; j < matriz[i].length; j++) {
            linha = linha + "<td class=matriz>" + matriz[i][j] + "</td>";
        }
    }
    document.write(linha + "</table>" + "<br />");
}

function multCompat(matriz1, matriz2) {
    var compat = false;
    if (matriz1[0].length == matriz2.length) {
        compat = true;
    }
    return compat;
}

function somaCompat(matriz1, matriz2) {
    var compat = false;
    if ((matriz1.length == matriz2.length) && (matriz1[0].length == matriz2[0].length)) {
        compat = true;
    }
    return compat;
}

function multiplicarMatriz(matriz1, matriz2) {
    var matrizResul = criarMatriz(matriz1.length, matriz2[0].length, false, false);
    for (var i = 0; i < matriz1.length; i++) {
        for (var j = 0; j < matriz2[0].length; j++) {
            matrizResul[i][j] = 0;
            for (var k = 0; k < matriz1[0].length; k++) {
                matrizResul[i][j] = matrizResul[i][j] + (matriz1[i][k] * matriz2[k][j]);
            }
        }
    }

    return matrizResul;
}

function multiplicarValor(matriz, valor) {
    var matrizResul = criarMatriz(matriz.length, matriz[0].length, false, false);
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz[0].length; j++) {
            matrizResul[i][j] = matriz[i][j] * valor;
        }
    }
    return matrizResul;
}

function somarMatriz(matriz1, matriz2) {
    var matrizResul = criarMatriz(matriz1.length, matriz1[0].length, false, false);
    for (var i = 0; i < matriz1.length; i++) {
        for (var j = 0; j < matriz1[0].length; j++) {
            matrizResul[i][j] = matriz1[i][j] + matriz2[i][j];
        }
    }
    return matrizResul;
}

function transposta(matriz) {
    var trans = criarMatriz(matriz[0].length, matriz.length, false, false);
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz[0].length; j++) {
            trans[j][i] = matriz[i][j];
        }
    }
    return trans;
}

function valorValido(menor, maior, texto) {
    do {
        var resposta = parseInt(prompt(texto));
        if (resposta < menor || resposta > maior || resposta == null) {
            alert("Valor Inválido");
        }
    } while (resposta < menor || resposta > maior || resposta == null);
    return resposta;
}

function questao() {
    var digitar = valorValido(1, 3, "1. Digitar os Valores ---- 2. Aleatorizar os Valores ---- 3. Todos como 0");
    var linhas = valorValido(1, 500, "Número de Linhas (1 a 500)");
    var colunas = valorValido(1, 500, "Número de Colunas (1 a 500)");
    var random = false;
    var type = false;
    switch (digitar) {
        case 1:
            random = false;
            type = true;
            break;

        case 2:
            random = true;
            type = false;
            break;

        case 3:
            random = false;
            type = false;
            break;
    }
    var matriz = criarMatriz(linhas, colunas, random, type);
    return matriz;
}

var resposta = valorValido(1, 5, "O que você deseja fazer: ---- 1. Transposta ---- 2. Soma de Matrizes ---- 3. Multiplicar Matriz por número ---- 4. Multiplicar uma Matriz por outra ---- 5. Sair");

switch (resposta) {
    case 1:
        var matriz = questao();
        mostrarMatriz(matriz, "Matriz Original");
        mostrarMatriz(transposta(matriz), "Matriz Transposta");
        break;

    case 2:
        do {
            var repetir = false;
            alert("Matriz 1");
            var matriz1 = questao();
            alert("Matriz 2");
            var matriz2 = questao();
            if (!somaCompat(matriz1, matriz2)) {
                alert("Matrizes Incompatíveis");
                repetir = true;
            }
        } while (repetir);
        mostrarMatriz(matriz1, "Matriz 1");
        mostrarMatriz(matriz2, "Matriz 2");
        mostrarMatriz(somarMatriz(matriz1, matriz2), "Soma das Matrizes");
        break;

    case 3:
        alert("Matriz");
        var matriz = questao();
        mostrarMatriz(matriz, "Matriz 1");
        mostrarMatriz(multiplicarValor(matriz, valorValido(-999999, 999999, "Valor para multiplicar (-999999 a 999999")), "Matriz Multiplicada");
        break;

    case 4:
        do {
            var repetir = false;
            alert("Matriz 1");
            var matriz1 = questao();
            alert("Matriz 2");
            var matriz2 = questao();
            if (!multCompat(matriz1, matriz2)) {
                alert("Matrizes Incompatíveis");
                repetir = true;
            }
        } while (repetir);
        mostrarMatriz(matriz1, "Matriz 1");
        mostrarMatriz(matriz2, "Matriz 2");
        mostrarMatriz(multiplicarMatriz(matriz1, matriz2), "Multiplicação das Matrizes");
        break;
}