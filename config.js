module.exports = {
    app: {
        prefix: '!',
        token: 'ODgyMTc0MTY3ODAwMjUwNDE5.GTqHAv.U3xpACvWUctaMYPdc782zJrtXR6AbBaVNNSea0',
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
