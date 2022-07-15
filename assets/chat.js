$(function() {
    var time = 800;
    var div_main = $(".main");
    var div_form = $(".form");
    var stop = false;

    function message(message, className){
        return `<div class="${className}">${message}</div>`;
    }

    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async function loop(data) {
        for(var i = 0; i < data.length; i++) {
            div_main.append(message(data[i], "from"));
            await sleep(time);
        }
    }

    function main() {
        var data = [
            "Muito bem!",
            "Para iniciarmos, me fale o seu primeiro nome!",
        ];

        loop(data);

        var data = [
            "Show! Samuel, a digitação da proposta é feita hoje e enviada para que formalize.",
            "A data prevista para liberação do dinheiro sera no dia 15/08",
        ];
    }

    main();
});