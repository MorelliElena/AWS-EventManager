
const getDaysArray = function (start, end) {
    let arr = [];
    let dt = new Date(start);
    for (; dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

function getDaysList (start, end) {
    const dayList = getDaysArray(start, end);
    dayList.map((v) => v.toISOString().slice(0, 10)).join("")
    return dayList
}

const getCurrentDateAndTime = function () {
    return new Date()
}

getCurrentDate = function (date){
    date.setHours(0,0,0,0)
    return date
}

module.exports = {
    getDaysList,
    getCurrentDateAndTime,
    getCurrentDate
}