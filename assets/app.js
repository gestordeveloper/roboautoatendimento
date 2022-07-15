$(function() {

    var time = 800;

    var base = [
        "Muito bem!",
        "Para iniciarmos, me fale o seu primeiro nome!",
        "Show! Samuel, a digitação da proposta é feita hoje e enviada para que formalize.",
        "A data prevista para liberação do dinheiro sera no dia 15/08"
    ]

    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async function main() {
        for(var i = 0; i < base.length; i++) {
            console.log(base[i]);
            await sleep(time);

            if(i === 1){
                console.log(">> Samuel");
                await sleep(time);
                i=1;
            }
        }
    }

    main()

});