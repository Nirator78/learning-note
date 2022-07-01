/**
 * Permet de convertir une date au format
 * DD/MM/YYYY : HH:mm:ss
 * @param dater
 * @returns 
 */
const getDateFormated = (dateSend : Date) => {
    const date = new Date(dateSend);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth()+1)).slice(-2);
    const day = ("0" + (date.getDate())).slice(-2);
    const hour = ("0" + (date.getHours())).slice(-2);
    const minute = ("0" + (date.getMinutes())).slice(-2);
    const second = ("0" + (date.getSeconds())).slice(-2);
    return day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second;
}

export {getDateFormated};