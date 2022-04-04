import middy from "middy";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";


import {
    cors,
    doNotWaitForEmptyEventLoop,
    httpHeaderNormalizer,
    httpErrorHandler
} from "middy/middlewares";

const handler  = async (event) => {
    try {
        process.setMaxListeners(Infinity);
        function delay(time) {
            return new Promise(function(resolve) { 
                setTimeout(resolve, time)
            });
         }
        console.log('process.env.IS_OFFLINE', process.env.IS_OFFLINE);
        const executablePath = process.env.IS_OFFLINE
            ? "D:\\VisualCodeProjects\\openServerManagementPageInChrome\\node_modules\\puppeteer\\.local-chromium\\win64-901912\\chrome-win\\chrome.exe"//"C:\\Users\\Wissem\\test\\node_modules\\puppeteer\\.local-chromium\\win64-686378\\chrome-win\\chrome.exe"
            : await chromium.executablePath;
        console.log('executablePath', executablePath);
        var browser = await puppeteer.launch({
            headless: true,
            args: [...new Set([...[
                '--disable-features=site-per-process', //to look inside iframes
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
            ],...chromium.args])], // merge array without duplicates
            executablePath
        });

        var page = await browser.newPage();
        const {url} = event.queryStringParameters;
        const {timeout} = event.queryStringParameters;
        console.log('url',url);
        console.log('timeout',timeout);
        
        await page.goto(url, {
            waitUntil: ["load","domcontentloaded"], timeout: 0
        });
        await delay(7000);
        await page.evaluate(() => {
            document.domain = 'isograd.com';
            console.log('document.domain', document.domain)
        }); //execute js inside page
        await page.waitForSelector('#deskdiv iframe[id*="iframe_"]', {timeout: 5000}).then(() => {
            console.log('#deskdiv iframe[id*="iframe_"]  exist');
        }).catch(e => {
            console.log('#deskdiv iframe[id*="iframe_"] doesnot exist', e.toString());
        });
        const elementHandle = await page.$('#deskdiv iframe[id*="iframe_"]');
        const rdp_iframe = await elementHandle.contentFrame();
        await rdp_iframe.waitForSelector('#thinrdp_canvas_1 canvas', {timeout: timeout}).then(() => {
            console.log('#deskdiv iframe[id*="iframe_"] #thinrdp_canvas_1 canvas exist');
        }).catch(e => {
            console.log('#deskdiv iframe[id*="iframe_"] doesnot exist', e.toString());
        });  //wait until thinfinity succeed to open rdp session and pass or timeout

        await page.close();
        await browser.close();

    }catch (e) {
        console.log('Exception',e.toString());
        try{
            await page.close();
            await browser.close();
        }catch(e){

        }
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: e.toString(),
                    success:0
                },
                null,
                2
            ),
        };
    }
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Alls done',
        success:1
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
export const doprocess = middy(handler)
    .use(httpHeaderNormalizer())
    .use(cors())
    .use(doNotWaitForEmptyEventLoop())
    .use(httpErrorHandler());