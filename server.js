const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
const client = new discord.Client();

http.createServer(function(req, res){
  if (req.method == 'POST'){
    var data = "";
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      if(!data){
        res.end("No post data");
        return;
      }
      var dataObject = querystring.parse(data);
      console.log("post:" + dataObject.type);
      if(dataObject.type == "wake"){
        console.log("Woke up in post");
        res.end();
        return;
      }
      res.end();
    });
  }
  else if (req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot is active');
  }
}).listen(3000);

client.on('ready', message =>{
  console.log('Bot準備完了～');
  client.user.setPresence({ game: { name: '丁寧語の使い方' } });
});

client.on('message', message =>{
  if(message.content == "!mem"){
    message.channel.send(
  {embed: {
    author: {
      name: "author name",
      url: "https://discordapp.com", // nameプロパティのテキストに紐付けられるURL
      icon_url: "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    title: "タイトル",
    url: "https://discordapp.com", // titleプロパティのテキストに紐付けられるURL
    description: "This is description. [URLを埋め込むことも出来る](https://discordapp.com)\n" +
                 "***embedの中でもMarkDownを利用できます***",
    color: 7506394,
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "©️ example | footer text"
    },
    thumbnail: {
      url: ""
    },
    image: {
    url: "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    fields: [
      {
        name: "field :one:",
        value: "*ここはfield 1の内容だよ*"
      },
      {
        name: "field :two:",
        value: "~~ここはfield 2の内容だよ~~"
      },
      {
        name: "field :three:",
        value: "__ここはfield 3の内容だよ__"
      },
      {
        name: "inline field :cat:",
        value: "`これはinlineのfieldだよ`",
        inline: true
      },
      {
        name: "inline field :dog:",
        value: "[これもinlineのfieldだよ](https://discordapp.com)",
        inline: true
      }
    ]
  }}
);

  }
});

if(process.env.DISCORD_BOT_TOKEN == undefined){
 console.log('DISCORD_BOT_TOKENが設定されていません。');
 process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );

function sendReply(message, text){
  message.reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option={}){
  client.channels.get(channelId).send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}
