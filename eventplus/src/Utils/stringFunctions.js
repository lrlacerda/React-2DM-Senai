export const dateFormatDbToView = (data) => {
    data = data.substr(0, 10); //retorna apenas a data (2023-09-30)
    data = data.split("-"); //[2023, 09, 30] virou um array
    return `${data[2]}/${data[1]}/${data[0]}`; // 30/09/2023
};
