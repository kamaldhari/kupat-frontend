export interface SlotsData {
    slots: {
        day: string,
        time: string
    }
}
export interface VenueShowsData {
    featureCategoryName: string
    featureId: string
    dateTime: string
    showImage: string
    showVenuTime: [{ venue: string, slots: SlotsData[] }]
}

interface AboutVenue {
    Age_Tpye: string
    Duration_In_Minutes: number
    Is_Filmed: false
    Show_Info?: string
    Price: number
    Show_Type: string
    id: number
    Start_Time: string
}
interface VenueCardBenedfits {
    Sub_Title: string
    Title: string
    Card_Image: string
    id: number
}
export interface FAQ {
    Faq_Answer: string
    Faq_Question: string
    id: number
}
interface SocialLinks {
    Link: string
    Social_Link: string
    Social_Platform_Name: string
    id: number
}
export interface GalleryImages {
    image: string
}
export interface VenueDetail {
    Title: string
    Description: string
    Venue_Image: string
    Venue_Video: string
    Show_Details: {
        About_Show: AboutVenue
        Card_Benifits: VenueCardBenedfits[]
        FAQ: FAQ[]
    }
    Show_Info: string
    Social_Link: SocialLinks[]
    Gallery: GalleryImages[]
}