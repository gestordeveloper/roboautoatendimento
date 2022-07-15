$(function() {
    var time = 3000;

    var send = "";
    var step = 1;
    var messages = [
        {text: "Muito bem!", allow: "from"},
        {text: "Para iniciarmos, me fale o seu primeiro nome!", allow: "from"},
    ];

    var div_main = $(".main");

    var div_form = $(".form");
    var div_form2 = $(".form2");

    var input = $("#message");
    var button = $(".button");

    function message(message, className){
        return `<div class="${className}">${message}</div>`;
    }

    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async function loop(data, line) {
        for(var i = line; i < data.length; i++) {
            div_main.append(message(data[i].text, data[i].allow));
            await sleep(time);
        }
    }

    loop(messages, 0);

    button.click(() => {
        div_main.append(message(input.val(), "to"));
        send = input.val();

        if(step == 1) {
            sleep(6000);
            messages.push({text: "Show! "+send+", a digitação da proposta é feita hoje e enviada para que formalize.", allow: "from"})
            messages.push({text: "A data prevista para liberação do dinheiro sera no dia 15/08", allow: "from"})
            messages.push({text: "O valor previsto para quem recebe o benefício de R$ 400,00 é de: 2000,00 em 24x 160,00 descontado já diretamente no seu Auxilio Brasil!", allow: "from"})
            messages.push({text: "Agora vamos iniciar a digitação okay?", allow: "from"})
            loop(messages, 2);

            step++;
            send = "";
        } else if(step == 2) {

        }
    });

});