export default {
  settings: {
    gameTime: 5,
    mistakesCount: 3,
  },

  questions: [
    {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `/audio/Aretha_Franklin-Today_I_Sing_the_Blues.mp3`,
          genre: `blues`,
        },
        {
          src: `/audio/Radiohead-Creep.mp3`,
          genre: `rock`,
        },
        {
          src: `/audio/Lana_Del_Rey-Without_You.mp3`,
          genre: `pop`,
        },
        {
          src: `/audio/Sum41-With_Me.mp3`,
          genre: `rock`,
        },
      ],
    },
    {
      type: `artist`,
      audio: {
        src: `/audio/Nikolay_Baskov-Sharmanka.mp3`,
        artist: `Nikolay Baskov`,
      },
      answers: [
        {
          picture: `https://globalsib.com/wp-content/uploads/2017/10/KMO_072120_00704_1_t218_155408.jpg`,
          artist: `Sergey Penkin`,
        },
        {
          picture: `http://www.sncmedia.ru/upload/iblock/38e/38ee5585b9bef3eee340875b604b4287_w877_h500_crp.jpg`,
          artist: `Nikolay Baskov`,
        },
        {
          picture: `https://pics.utro.ru/utro_photos/2018/07/26/1368483.jpg`,
          artist: `Prosto Borya`,
        },
      ],
    },
  ],
};
