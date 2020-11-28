// Example modified from https://github.com/mqttjs/MQTT.js#example
const mqtt = require('mqtt');

// Vehicle positioning for ongoing buses at Lauttasaari bridge
const myTopic = '/hfp/v2/journey/ongoing/vp/bus/+/+/+/+/+/+/+/+/60;24/18/69/27/#';

const hslClient = mqtt.connect('mqtts://mqtt.hsl.fi:8883');

hslClient.on('connect', function () {
    hslClient.subscribe(myTopic, function (err) {
        if (!err) {
            console.log('Connected!');
        } else {
            console.log(err);
        }
    })
});

hslClient.on('message', function (topic, message) {
    // todo: handle the traffic jam and speeding logic here
let json = JSON.parse(message.toString())

    if(json.VP.spd * 3.6 > 20){
        console.log(json.VP.veh + " is speeding at " + json.VP.spd * 3.6 )
    }else {
        console.log(json.VP.veh + " is driving below the speed limit at the speed of " + json.VP.spd * 3.6)
    }

    //console.log(message.toString());
});