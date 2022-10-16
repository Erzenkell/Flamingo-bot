const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'controller',
    description: "set controller channel ",
    voiceChannel: false,
    permissions: PermissionsBitField.Flags.ManageMessages,
    options: [
        {
            name: 'channel',
            description: 'the channel you want to send it to',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    async execute({ inter }) { 
      let Channel = inter.options.getChannel('channel');
      if (Channel.type !== 0) return inter.reply({ content: `you have to send it to a text channel.. ❌`, ephemeral: true})

    Channel.send({ content: `**Controller Channel Set**` })

    },
}
