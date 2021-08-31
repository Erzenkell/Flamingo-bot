const Discord = require('discord.js');

const { joinVoiceChannel } = require('@discordjs/voice');

const {
    prefix,
	token,
} = require('./config.json');

const ytdl = require('ytdl-core');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once('ready', () => {
    console.log('ready');
});
client.once('reconnecting', () => {
    console.log('reconnecting');
});
client.once('disconnect', () => {
    console.log('disconnect');
});

client.on('messageCreate', async message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const serverQueue = queue.get(message.guild.id)

    if (message.content.startsWith(`${prefix}flamingo`)) {
        playFlamingo(message, serverQueue);
        return;
    }
    // else if (message.content.startsWith(`${prefix}play`)) {
    //     play(message, serverQueue);
    //     return;
    // }
});

const queue = new Map();

async function playFlamingo(message, serverQueue) {  

    console.log("flamingo");

    const voiceChannel = message.member.voice.channel;
    console.log(voiceChannel);

    if(!voiceChannel){
        return message.channel.send("Connecte toi dans un channel vocal avant mongolo");
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("J'ai pas le droit de me connecter et parler ici mongolo")
    }

    const song = {
        title: "Kero Kero Bonito - Flamingo",
        url: "https://www.youtube.com/watch?v=rY-FJvRqK0E",
    };

    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
    
        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.log(error);
            queue.delete(message.guild.id);
            return message.channel.send(error);
        }
    }
    else {
        serverQueue.songs.push(song);
        return message.channel.send("Flamingo a été ajouté a la queue")
    }
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`${song.title}`);
  }

client.login(token);