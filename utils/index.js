const moment = require('moment')

require('moment-timezone')
moment.tz.setDefault('Asia/Seoul')

function now () {
    return moment().valueOf()
}

const getToday = function (separator) {
    if (separator) separator = '-'

    const today = new Date()

    const year = String(today.getFullYear()) // 년도
    let month = String(today.getMonth() + 1) // 월
    let date = String(today.getDate()) // 날짜
    // let day = today.getDay();  // 요일

    if (parseInt(month, 10) < 10) month = '0' + month
    if (parseInt(date, 10) < 10) date = '0' + date

    return year + separator + month + separator + date
}

const getDateStr = function (_date) {
    const year = String(_date.getFullYear()) // 년도
    let month = String(_date.getMonth() + 1) // 월
    let date = String(_date.getDate()) // 날짜
    // let day = today.getDay();  // 요일

    if (parseInt(month, 10) < 10) month = '0' + month
    if (parseInt(date, 10) < 10) date = '0' + date

    return year + '' + month + '' + date
}

const getTodayNoSep = function () {
    return moment().format('YYYYMMDD')
}

const getTodate = function() {
    const today = new Date()

    const year = String(today.getFullYear()) // 년도
    let month = String(today.getMonth() + 1) // 월
    let date = String(today.getDate()) // 날짜
    // let day = today.getDay();  // 요일    

    if (parseInt(month, 10) < 10) month = '0' + month
    if (parseInt(date, 10) < 10) date = '0' + date

    const hours = ('0' + today.getHours()).slice(-2); 
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2); 

    return year + '-' + month + '-' + date
        + ' ' + hours + ':' + minutes + ':' + seconds; 
}

function prevDate(day) {
    const now = new Date();
    const prevDay = new Date(now.setDate(now.getDate() - day));
    return getDateStr(prevDay);
}

/**
 * @method strReplaceAll
 *
 * @param  {String}   str         [target string]
 * @param  {String}   searchStr   [search string]
 * @param  {String}   replaceStr  [replace string]
 *
 * @author jw.lee
 * @Date   2019.11.28
 *
 * @Desc   str 로 받은 문자열에서 searchStr 로 받은 문자열을 replaceStr 로 모두 변환
 */
const strReplaceAll = function (str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr)
}


module.exports = {
    now,
    getToday, getTodayNoSep, getTodate, 
    getDateStr, prevDate, 
    strReplaceAll,
}
