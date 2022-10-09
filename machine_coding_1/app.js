const { platform } = require('os');
const { exec } = require('child_process');

var url = 'https://www.wikipedia.com';
var browser = 'Firefox';//'Google Chrome';
var pids={};


function open_browser(browser_input, url){

    let status='', browser;
    if(browser_input == 'chrome') browser= 'Google Chrome';
    else if(browser_input == 'firefox') browser= 'Google Chrome';
    else{
        status= 'browser param invalid. Taking firefox as a default browser.';
        browser= 'Google Chrome';
    }

    if (url === undefined) {
        console.error('Please enter a URL, e.g. "http://www.browserstack.com"');
        status+= '  invalid url';
        return {code:0, status};
        
    }
    let command;
    if (process.platform === 'win32') {
        status+= '  I used macbook. So, It may not work in windows as i am not able to test it in window machine.';
        console.log(status);
        command = `start ${browser} ${url}`;
    }else {
        status+= '  No platform detected';
        console.log(status);
        command = `google-chrome --no-sandbox ${url}`;
    }
    console.log(`exec command: ${command}`); 
    pids[browser_input] = exec(command).pid;
    console.log(pids, 'process ids');
    return {code:1, status};//success exec


}

function kill_browser(browser_input){
    let status='browser killed', browser, pid;
    console.log(browser_input);
    if(browser_input == 'chrome') browser= 'Google Chrome';
    else if(browser_input == 'firefox') browser= 'Google Chrome';
    else{
        status= 'browser param invalid.';
        console.log(status);
   browser= 'Google Chrome';
        
        return {status};
    }
    console.log(`:test: ${browser} kill`);

   let pid_number=6416;
    exec(`taskkill /F /PID  ${pid_number} /F`);
    return {status};
}




module.exports= {
    open_browser,
   kill_browser
}