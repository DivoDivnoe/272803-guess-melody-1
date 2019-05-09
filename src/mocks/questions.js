export default {
  settings: {
    gameTime: 5,
    mistakesCount: 3,
  },

  questions: [
    {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
          genre: `jazz`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
          genre: `rock`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
          genre: `pop`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
          genre: `jazz`,
        },
      ],
    },
    {
      type: `artist`,
      audio: {
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
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
