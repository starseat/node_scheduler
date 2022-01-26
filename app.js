// https://www.npmjs.com/package/node-schedule
const schedule = require('node-schedule');

const path = require('path');
const fs = require('fs');

const zl = require("zip-lib");

const utils = require('./utils');

require("dotenv").config();

const job_compress = schedule.scheduleJob({hour: 2, minute: 10}, () => {
    compressFile();
})

const job_remove = schedule.scheduleJob({hour: 2, minute: 20}, () => {
    removeFile();
})

const compressFile = () => {
    const __TARGET_PATH = path.join(process.env.TARGET_PATH);
    const _targetDate = utils.prevDate(parseInt(process.env.CYCLE_DAY_COMPRESS, 10));
    // console.log(`compress target date: ${_targetDate}`);
    const dirs = fs.readdirSync(__TARGET_PATH, {withFileTypes: true});
    dirs.forEach(_file => {
        const _dir = _file.name;
        if(_file.isDirectory()) {
            if(parseInt(_dir, 10) < parseInt(_targetDate, 10)) {
                // console.log(`${_dir} is compress target.`);
                const _targetDir = path.join(__TARGET_PATH + '/' + _dir);
                zl.archiveFolder(_targetDir, _targetDir + '.zip')
                .then(function (result) {
                    // console.log(`${_dir} compress done. result: `, result);
                    fs.rmdirSync(_targetDir, { recursive: true });
                }, (err) => {
                    console.log(`${_dir} compress error. message: `, err);
                });
            }
        }
    });
}

const removeFile = () => {
    const __TARGET_PATH = path.join(process.env.TARGET_PATH);
    const _targetDate = utils.prevDate(parseInt(process.env.CYCLE_DAY_REMOVE, 10));
    // console.log(`remove target date: ${_targetDate}`);
    const dirs = fs.readdirSync(__TARGET_PATH, {withFileTypes: true});
    dirs.forEach(_file => {
        const _filename = _file.name;
        const _extname = path.extname(_filename);
        const _name = path.basename(_filename, _extname);

        if(!_file.isDirectory()) {
            if(!isNaN(parseInt(_name))) {
                if(parseInt(_name, 10) < parseInt(_targetDate, 10)) {
                    // console.log(` remove file name: ${_filename}`);
                    const _targetFile = path.join(__TARGET_PATH + '/' + _name + '.zip');
                    fs.unlinkSync(_targetFile);
                }
            }
        }
    });
}

process.on('SIGINT', function () {
    schedule.gracefulShutdown().then(() => {
        job_compress.cancel();
        job_remove.cancel();
        
        process.exit(0);
    })
});
