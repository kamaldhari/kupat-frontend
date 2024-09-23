import dayjs from "dayjs";

export const formateDate = (date: string) => {
    if (!date && !dayjs(date).isValid()) {
        return "-"
    }
    const Dates = dayjs(date);
    const Day = Dates.format('d');
    const Month = Dates.format('MMMM');
    const numericMonth = Dates.format('M');
    const Year = Dates.format('YYYY');
    return `${Year} ${Month} ${Day}-${numericMonth}`;
}
export const formateDateTime = (date: string) => {
    if (!date && !dayjs(date).isValid()) {
        return "-"
    }
    const Dates = dayjs(date);
    const day = dayjs(Dates).format('D');
    const month = dayjs(Dates).format('M');
    const monthName = dayjs(Dates).format('MMMM');
    const year = dayjs(Dates).format('YYYY');
    return `${month}-${day} ${monthName} ${year}`;
}