$(function() {
    var time = 1200;

    var image = "";
    var send = "";
    var step = 1;
    var messages = [
        {text: "Muito bem!", allow: "from"},
        {text: "Para iniciarmos, me fale o seu primeiro nome!", allow: "from"},
    ];

    var div_main = $(".main");

    var input = $("#message");
    var button = $(".button");

    var div_form = $(".form");
    var div_form2 = $(".form2");
    var div_form3 = $(".form3");

    function message(message, className){
        return `<div class="${className}"><p>${message}</p></div>`;
    }

    async function sleep(milliseconds) {
        await setSleep(milliseconds);
    }

    function setSleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async function loop(data, line) {
        for(var i = line; i < data.length; i++) {
            div_main.append(message(data[i].text, data[i].allow));
            scrollToBottom();
            await sleep(time);
        }
    }

    loop(messages, 0);

    button.click(async () => {
        if(step == 1) {
            messages = [];
            div_main.append(message(input.val(), "to"));
            scrollToBottom();
            send = input.val();
            div_form.css("display", "none");
            await sleep(time);

            messages.push({text: "Show! "+send+", a digitação da proposta é feita hoje e enviada para que formalize.", allow: "from"})
            messages.push({text: "A data prevista para liberação do dinheiro sera no dia 15/08", allow: "from"})
            messages.push({text: "O valor previsto para quem recebe o benefício de R$ 400,00 é de: 2000,00 em 24x 160,00 descontado já diretamente no seu Auxilio Brasil!", allow: "from"})
            messages.push({text: "Agora vamos iniciar a digitação okay?", allow: "from"})
            loop(messages, 0);

            await sleep(4000);
            div_form2.css("display", "flex");
            scrollToBottom();

            step++;
            send = "";
        } else if(step == 2) {
            messages = [];
            div_main.append(message("Okay!", "to"));
            scrollToBottom();
            div_form2.css("display", "none");
            await sleep(time);

            messages.push({text: "Maravilha! Tenha ja em mãos os seguintes documentos: CPF, RG, Comp. de Residência, Dados bancários.", allow: "from"});
            messages.push({text: "Vamos começar enviando uma foto do seu CPF. Clique no botão abaixo para abrir a camera e registrar a foto.", allow: "from"});
            loop(messages, 0);

            await sleep(2000);
            div_form3.css("display", "flex");
            scrollToBottom();

            step++;
            send = "";
        } else if(step == 3) {
            messages = [];
            openCamera();
            div_form3.css("display", "none");

            step++;
            send = "";
        } else if(step == 4) {
            messages = [];
            takePhoto();

            messages.push({text: "<img src='"+image+"' alt=''>", allow: "to"});
            messages.push({text: "Foto do CPF enviado!", allow: "to"});
            loop(messages, 0);
            await sleep(time);

            messages = [];
            messages.push({text: "Muito bem! agora vamos enviar a parte da frente do RG.", allow: "from"});
            loop(messages,0);

            await sleep(time);
            div_form3.css("display", "flex");
            scrollToBottom();

            step++;
            send = "";
            image = "";
        } else if(step == 5) {
            messages = [];
            openCamera();
            div_form3.css("display", "none");

            step++;
            send = "";
            image = "";
        } else if(step == 6) {
            messages = [];
            takePhoto();

            messages.push({text: "<img src='"+image+"' alt=''>", allow: "to"});
            messages.push({text: "Foto de frontal RG enviado!", allow: "to"});
            loop(messages, 0);
            await sleep(time);

            messages = [];
            messages.push({text: "Muito bem! agora vamos enviar a parte de trás do RG.", allow: "from"});
            loop(messages,0);

            await sleep(time);
            div_form3.css("display", "flex");
            scrollToBottom();

            step++;
            send = "";
            image = "";
        }
    });

    function openCamera() {
        var camArea = $(".cam");
        var camera = document.getElementById("camera");

        if(navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({audio: false, video: {width: 1280, height: 720}}).then((stream) => {
                camArea.css("display", "flex");
                camera.srcObject = stream;
            }).catch((error) => {
                alert("Ooops! Falhou.");
            });
        }
    }

    function takePhoto() {
        var camera = document.getElementById("camera");
        var canvas = document.createElement("canvas");

        canvas.width = camera.videoWidth;
        canvas.height = camera.videoHeight;
        var ctx = canvas.getContext('2d');

        ctx.drawImage(camera, 0,0, canvas.width, canvas.height);

        var uri = canvas.toDataURL('image/jpeg');
        generatePhoto(uri);
    }

    function generatePhoto(base64) {
        console.log(base64);

        image = "";
        image = base64;

        var camArea = $(".cam");
        var camera = document.getElementById("camera");
        camera.pause();
        camArea.css("display", "none");
    }

    function scrollToBottom() {
        var mainHeight = document.getElementById("main");
        mainHeight.scrollTop = mainHeight.scrollHeight;
    }
});