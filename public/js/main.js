var tempoInicial = $("#tempo").text();
var campo = $(".campo");

$(document).ready(function(){
    atualizaTamanhoFrase();
    inicialContadores();
    inicialCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
    inicializaMarcadores();
    atualizaPlacar()
});

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo").text(tempo)
}

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();    
    var numeroPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numeroPalavras);
}

function inicialContadores() {
    campo.on("input",function(){
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(" ").length;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicialCronometro() {
    campo.one("focus", function(){
        var tempoRestante = $("#tempo").text();
        var cronometroID = setInterval(function(){
            tempoRestante--; 
            $("#tempo").text(tempoRestante);
            if(tempoRestante <= 0){               
                clearInterval(cronometroID);
               finalizaJogo();
            }
        },1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }else{
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
    
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo").text(tempoInicial);
    inicialCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
