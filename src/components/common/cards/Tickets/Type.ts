export interface DataProps {
    image: string;
    title: string;
    date: string;
    description: string;
    showVenuTime:{venue:string,slots:{day:string,time:string}[]}[]
}

export interface TicketComponentProps{
    data:DataProps
}