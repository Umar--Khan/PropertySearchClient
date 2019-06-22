export const backupUrls = i => {
  switch (i) {
    case 1:
      return {
        pictures: urls1
      };
    case 2:
      return {
        pictures: urls2
      };
    case 3:
      return {
        pictures: urls3
      };
    case 4:
      return {
        pictures: urls4
      };
    case 5:
      return {
        pictures: urls5
      };
    case 6:
      return {
        pictures: urls6
      };
    case 7:
      return {
        pictures: urls7
      };
    case 8:
      return {
        pictures: urls8
      };
    case 9:
      return {
        pictures: urls9
      };
    case 10:
      return {
        pictures: urls10
      };
    default:
      return {
        pictures: urls
      };
  }
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const urls = [
  {
    path:
      "https://lid.zoocdn.com/645/430/cb907b09f20d517020ac6ec47df2ab9a62d57987.jpg",
    caption: ""
  },
  {
    path:
      "https://lid.zoocdn.com/645/430/2669ddeea3833f3a06550682b65c5267b8f6b07c.jpg",
    caption: ""
  },
  {
    path:
      "https://lid.zoocdn.com/645/430/b4cbef78217aae4817de31dc45c7592d1fa4a610.jpg",
    caption: ""
  },
  {
    path:
      "https://lid.zoocdn.com/645/430/aa368e61116c4b52865f1a0d1e95cbd7bebf19ea.jpg",
    caption: ""
  },
  {
    path:
      "https://lid.zoocdn.com/645/430/c61955b03f7c18ecd2bb0ffabfa51c1c3fa72d25.jpg",
    caption: ""
  },
  {
    path:
      "https://lid.zoocdn.com/645/430/6ae543f544f13b9c377ad8a57d8489a747f03ef5.jpg",
    caption: ""
  },
  {
    path:
      "https://lid.zoocdn.com/645/430/c7cc7c64f0a48d685c0dd2dd112b5bc3c0a35afe.jpg",
    caption: ""
  },
  {
    path:
      "https://lid.zoocdn.com/645/430/41bbe109ea46b2cce9cc254827599c32425cb342.jpg",
    caption: ""
  },
  {
    path:
      "https://lid.zoocdn.com/645/430/0ff7a6191f27b6938a070c9f0f61392b8cb72635.jpg",
    caption: ""
  }
].sort(() => Math.random() - 0.5);

const urls1 = urls.sort(() => Math.random() - 0.5);
const urls2 = urls1.sort(() => Math.random() - 0.5);
const urls3 = urls2.sort(() => Math.random() - 0.5);
const urls4 = urls2.sort(() => Math.random() - 0.5);
const urls5 = urls2.sort(() => Math.random() - 0.5);
const urls6 = urls2.sort(() => Math.random() - 0.5);
const urls7 = urls2.sort(() => Math.random() - 0.5);
const urls8 = urls2.sort(() => Math.random() - 0.5);
const urls9 = urls2.sort(() => Math.random() - 0.5);
const urls10 = urls2.sort(() => Math.random() - 0.5);
