function setCitiesSelect() {
    let input = $("#inputCity");
    if ($("#inputState").val() != "null") {
        //const axios = require('axios');
        // Make a request for a user with a given ID
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + $("#inputState").val() + '/municipios')
            .then(function (response) {
                // handle success
                console.log(response);

                input.empty();
                input.append("<option value='null' selected>Selecione a Cidade</option>");
                for (let i = 0; i < response.data.length; i++) {
                    input.append("<option>" + response.data[i].nome + "</option>");
                }
            })
            .catch(function (error) {
                alert("Algo deu errado no IBGE! Chamem os bombeiros!!")
                console.log(error);
            })
            .then(function () {
                input.removeAttr("disabled");
            });
    } else {
        input.empty();
        input.append("<option value='null' selected>Selecione um Estado</option>");
        input.attr("disabled", "true");
    }
}