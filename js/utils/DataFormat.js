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
    } else if (month === 12) {
        formatterMonth = "Dezembro";
    }

    return formatterDay + ' de ' + formatterMonth + ' de ' + year;
}

function getFormattedDateFeed(dataConvert) {
    
    var date = new Date(dataConvert);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hora = date.getHours();
    var minuto = date.getMinutes();

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
    } else if (month === 12) {
        formatterMonth = "Dezembro";
    }

    return formatterDay + ' de ' + formatterMonth + ' de ' + year + ' às ' + hora + ':' + minuto;
}

function calcularTempPlataforma(dataDeCriacao) {

    var dataAtual = new Date();
    var dataCriacao = new Date(dataDeCriacao);
    var diferenca = dataAtual.getTime() - dataCriacao.getTime();
    var dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    var horas = Math.floor(diferenca / (1000 * 60 * 60));
    var minutos = Math.floor(diferenca / (1000 * 60));
    var segundos = Math.floor(diferenca / 1000);

    if (dias > 0) {
        return dias + ' dias';
    } else if (horas > 0) {
        return horas + ' hora';
    } else if (minutos > 0) {
        return minutos + ' minutos';
    } else {
        return segundos + ' segundos';
    }

}

export {
    getFormattedDate,
    getFormattedDateFeed,
    calcularTempPlataforma
}