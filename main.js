const cheerio = require('cheerio');
const got = require('got');
const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require("path");

const vgmUrl= 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=panini&_sacat=0&LH_TitleDesc=0&_osacat=0&_odkw=nba'; 
// const vgmUrl= 'https://www.vgmusic.com/music/console/nintendo/nes';

require('http').globalAgent.options.keepAlive = true;
require('https').globalAgent.options.keepAlive = true;
require('http').globalAgent.maxSockets = 5000; // Infinity;
require('https').globalAgent.maxSockets = 5000; // Infinity;


const isMidi = (i, link) => {
  // Return false if there is no href attribute.
  if(typeof link.attribs.href === 'undefined') { return false }

  return link.attribs.href.includes('.mid');
};

const isItem = (i, link) => {
  if(typeof link.attribs.class === 'undefined') { return false }
  return link.attribs.class.includes('s-item__link');
}

const noParens = (i, link) => {
  // Regular expression to determine if the text has parentheses.
  const parensRegex = /^((?!\().)*$/;
  return parensRegex.test(link.children[0].data);
};

const mainApp = async () => {
  const response = await got(vgmUrl);
  const $ = cheerio.load(response.body);

  $('a').filter(isItem).filter(noParens).each((i, link) => {
    const href = link.attribs.href;
    console.log(href);
  });
};




const mainApp2 = async () => {
  const browser = await puppeteer.launch({
            headless: true,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
  const page = await browser.newPage();

  await page.goto(vgmUrl);

  const links = await page.$$eval('a', elements => elements.filter(element => {
    const parensRegex = /^((?!\().)*$/;
    return element.href.includes('.mid') && parensRegex.test(element.textContent);
  }).map(element => element.href));

  links.forEach(link => console.log(link));

  await browser.close();
};






async function scrape(url) {
  const browser = await puppeteer.launch({
            headless: true,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
  const page = await browser.newPage();
  await page.goto(url);

  var movies = await page.evaluate(() => {
    var titlesList = document.querySelectorAll("li.s-item");
    var movieArr = [];
    for (var i = 0; i < titlesList.length; i++) {
      if(!titlesList[i].querySelector('.s-item__link .s-item__title')) {continue}
      movieArr[i] = {
        title: (titlesList[i].querySelector('.s-item__link')) && (titlesList[i].querySelector('.s-item__link .s-item__title')).textContent,
      };

      
    }
    return movieArr;
  });
  fs.writeFile(
    "./result.json",
    JSON.stringify(movies, null, 3),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Great Success");
    }
  );

  browser.close();
}

const mainApp3 = async () => {
  scrape(vgmUrl)
};



const mainApp4 = () => {
  const dir = "./data";

  const result = fs
    .readdirSync(dir)
    .filter((name) => {
      return path.extname(name) === ".json" && name.includes('_B');
    })
    .map((name) => {
      return require(path.join(__dirname, dir, name)).fullTextAnnotation.text.replace(/\n/gi, ' ').split(' ').slice(1, 5).join(' ');
    });

  console.log(result);
}


mainApp3();