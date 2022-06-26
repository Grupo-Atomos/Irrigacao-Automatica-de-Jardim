//exemplo de script HTML/JS que publicará/assinará tópicos no Console do Google Chrome
//por JSH.
// https://www.eclipse.org/paho/files/jsdoc/index.html https://www.eclipse.org/paho/files/jsdoc/Paho.MQTT.Client.html-->
var wsbroker = "broker.mqttdashboard.com";  //mqtt websocket enabled broker
var wsport = 8000 // port for above

var client = new Paho.MQTT.Client(wsbroker, wsport,
    "Atomos_" + parseInt(Math.random() * 100, 10));

client.onConnectionLost = function (responseObject) {
    console.log("Conexão perdida: " + responseObject.errorMessage);
};

client.onMessageArrived = function (message) {
    console.log("Usuário:" + options.userName);
    console.log("Tópico:", message.destinationName, '\nMenssagem:', message.payloadString);
    // menssagem devolvida do broker e guardada na variavel vars -->
    var vars = (message.payloadString);
    document.getElementById('payload').innerHTML = vars;
    // Condições -->
    if (vars == "ON") {
        console.log("Retorno: Ligado!");
    } else if (vars == "OFF") {
        console.log("Retorno: Desligado!");

    } else if (vars == "Online") {
        console.log("Retorno: Conectado!");

    } else {
        console.log("Retorno: Não faz nada!");
    }
};

var options = {
    timeout: 3,
    useSSL: false,
    userName: " Jurandir",
    password: "1234",

    onSuccess: function () {
        console.log("Broker MQTT conectado");
        // Conexão bem-sucedida; subscrever o nosso tópico, pode adicionar várias linhas destes
        client.subscribe("cmnd/afpesp/jardim/POWER", { qos: 2 });

        //use o abaixo se você quiser publicar em um tópico no connect
        message = new Paho.MQTT.Message("Online");
        message.destinationName = "cmnd/afpesp/jardim/POWER";
        client.send(message);

        // chamado quando chega uma mensagem
        function onMessageArrived(message) {

            console.log("onMessageArrived:" + message.payloadString);

        }

    },
    onFailure: function (message) {
        console.log("Falha na conexão: " + message.errorMessage);
        exibe();
        
    }
};



function init() {
    client.connect(options);
}


function fun1() {
    //use o abaixo se você quiser publicar em um tópico no connect

    message = new Paho.MQTT.Message("OFF");
    message.destinationName = "cmnd/afpesp/jardim/POWER";
    client.send(message);

    console.log("Variavel: " + message.payloadString);

    //setTimeout(function() {
    //console.clear();}, 20*1000);

}

function ligar() {
    //use o abaixo se você quiser publicar em um tópico no connect

    message = new Paho.MQTT.Message("OFF");
    message.destinationName = "cmnd/afpesp/jardim/POWER";
    client.send(message);

    console.log("Variavel: " + message.payloadString);

    //setTimeout(function() {
    //console.clear();}, 20*1000);

}


function desligar() {
    //use o abaixo se você quiser publicar em um tópico no connect

    message = new Paho.MQTT.Message("ON");
    message.destinationName = "cmnd/afpesp/jardim/POWER";
    client.send(message);

    console.log("Variavel: " + message.payloadString);

    //setTimeout(function() {
    //console.clear();}, 20*1000);

}

function exibe() {
    var vars;
    document.getElementById("payload").innerHTML = vars;
}

function iniciar() {
    init();
    // exibe();  var vars = "Menssagem"; 
    // fun1(); 

}
