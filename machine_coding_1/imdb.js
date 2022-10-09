const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const readline = require("readline-sync");

let name =readline.question();
let tot=Number(readline.question());;
request("https://www.imdb.com/chart/top",
function (err,response,body) {
    if(err){
        console.log(err);
    }
    else{   
        getdata(body);
    }
})

function getdata(html) {
    const ch=cheerio.load(html);

    const data=ch("tr .titleColumn a");

    let map = new Map([[String.prototype, [String.prototype]]]);

    for(let i=0;i<data.length;i++){
        let authorName=ch(data[i])['0'].attribs.title.split(",");
        let filmName=ch(data[i]).text();

        for(let i=1;i<authorName.length;i++){
            // console.log(authorName);
            if(map[authorName[i]]==null) map[authorName[i]]=[];
            map[authorName[i]].push(filmName);
        }
    }

    console.log(map[" "+name]);
    fs.writeFile("abc.txt",map[" "+name][0], (err)=>{
        
    });
}
