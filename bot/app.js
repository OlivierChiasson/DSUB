// Main imports.
const Lodash = require('lodash');
const config = require('./config/config');
const emoji = require('./emoji');
const Discord = require('discord.js');


// Init Discord class.
const client = new Discord.Client();


const sendEmbed = (channel, title, desc, author, date, emojiArray, color) => {
    const testEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(title)
        .setDescription(desc)
        .setFooter(author + " • " + date);
        channel.send({embed: testEmbed}).then(embedMessage =>{
            for(i = 0; i < emojiArray.length; i++){
                embedMessage.react(eval("emoji." + emojiArray[i]));

            }
            
        
        
        });
}






// Discord events.
client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', (msg) => {
    console.log('MSG:: ' + msg.content);

    if(msg.content == "*abc") sendEmbed(msg.channel, "A / B / C", "Veuillez sélectionner une ou plusieurs options avec les réactions ci-dessous", "Bobby", "16/04/2021", ["letter_a", "letter_b", "letter_c"]);
    if(msg.content == "*abcd") sendEmbed(msg.channel, "A / B / C / D", "Veuillez sélectionner une ou plusieurs options avec les réactions ci-dessous", "Bobby", "16/04/2021", ["letter_a", "letter_b", "letter_c", "letter_d"]);
    if(msg.content == "*abcde") sendEmbed(msg.channel, "A / B / C / D / E", "Veuillez sélectionner une ou plusieurs options avec les réactions ci-dessous", "Bobby", "16/04/2021", ["letter_a", "letter_b", "letter_c", "letter_d", "letter_e"]);
    if(msg.content == "*abcdef") sendEmbed(msg.channel, "A / B / C / D / E / F", "Veuillez sélectionner une ou plusieurs options avec les réactions ci-dessous", "Bobby", "16/04/2021", ["letter_a", "letter_b", "letter_c", "letter_d", "letter_e", "letter_f"]);
    if(msg.content == "*abcdefg") sendEmbed(msg.channel, "A / B / C / D / E / F / G", "Veuillez sélectionner une ou plusieurs options avec les réactions ci-dessous", "Bobby", "16/04/2021", ["letter_a", "letter_b", "letter_c", "letter_d", "letter_e", "letter_f", "letter_g"]);
    if(msg.content == "*vraifaux") sendEmbed(msg.channel, "Vrai ou Faux?", "Veuillez sélectionner une des options avec les réactions ci-dessous", "Bobby", "16/04/2021", ["letter_check", "letter_cross"]);
    if(msg.content == "*question") sendEmbed(msg.channel, "Avez-vous des questions?", "Veuillez sélectionner une des options avec les réactions ci-dessous", "Bobby", "16/04/2021", ["letter_check", "letter_cross"]);
    if(msg.content == "*main") sendEmbed(msg.channel, "Vous avez une question?", "Appuyer sur la réaction ci-dessous pour lever votre main", "Bobby", "16/04/2021", ["letter_hand_up"]);
    
    
    
});







client.login(config.token);