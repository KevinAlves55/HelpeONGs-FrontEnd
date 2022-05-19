function getFormattedDate(dataConvert) {
    
    var date = new Date(dataConvert);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var formatterDay;	
    if (day < 10) {
        formatterDay = '0'+ day;
    } else {
        formatterDay = day;
    }
        
    var formatterMonth;	
    if (month === 1) {
        formatterMonth = "Janeiro";
    } else if (month === 2) {
        formatterMonth = "Fevereiro";
    } else if (month === 3) {
        formatterMonth = "Março";
    } else if (month === 4) {
        formatterMonth = "Abril";
    } else if (month === 5) {
        formatterMonth = "Maio";
    } else if (month === 6) {
        formatterMonth = "Junho";
    } else if (month === 7) {
        formatterMonth = "Julho";
    } else if (month === 8) {
        formatterMonth = "Agosto";
    } else if (month === 9) {
        formatterMonth = "Setembro";
    } else if (month === 10) {
        formatterMonth = "Outubro";
    } else if (month === 11) {
        formatterMonth = "Novembro";
    } else if (month === 3) {
        formatterMonth = "Dezembro";
    }

    return formatterDay + ' de ' + formatterMonth + ' de ' + year;
}

export {
    getFormattedDate
}