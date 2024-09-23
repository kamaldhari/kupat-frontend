interface CardBenifits {
  Title: string;
  Sub_Title: string;
  Card_Image: string;
}

interface AboutShow {
  Show_Type: string;
  Duration_In_Minutes: number;
  Age_Tpye: number;
  Start_Time: string;
  Price: number;
  Is_Filmed: boolean;
}
interface FAQ {
  Faq_Question: string;
  Faq_Answer: string;
}
export interface MetaDetails {
  Card_Benifits: CardBenifits;
  About_Show: AboutShow;
  FAQ: FAQ;
}

export interface ArtistButton {
  Button_Text: string;
  Button_Link: string;
}
export interface SocialLink {
  Social_Platform_Name: string;
  Social_Link: string;
}
export interface ArtistPage {
  Meta_details: MetaDetails;
  Artist_Button: ArtistButton;
  Social_link: SocialLink;
  Artist_Description: string;
  Show_Info: string;
}
export interface Artist {
  Artist_ID: number;
  Bibliography: string;
  Name: string;
  Slug: string;
  Show: { data: any[] };
}
interface ShowImage {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      url: string;
    };
  };
}

export interface ArtistShowDetail {
  attributes: {
    About_Show: any;
    F_AND_Q: FAQ[];
    Display_FAQ: boolean
    Events: any;
    Display_Agent_Tickets: boolean
    Display_About_Show: boolean
    Agent_Tickets: any;
    Feature_Description: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Show_ID: number;
    Name: string;
    Additional_Name: string | null;
    Synopsis: string;
    Date_Started: string | null;
    Rating_Name: string | null;
    Duration: number;
    Trailer: string | null;
    Feature_Type_ID: number;
    Director: string | null;
    Actors: string | null;
    Release_Countries: string | null;
    Release_Year: string | null;
    Original_Language: string | null;
    Original_Language_2: string | null;
    Sub_Language: string | null;
    Sub_Language_2: string | null;
    Dub_Language: string | null;
    Dub_Language_2: string | null;
    Timestamp: string;
    Vod_Start_Date_Time: string | null;
    Vod_End_Date_Time: string | null;
    Url: string | null;
    code: string;
    Talents: number[];
    Rating_ID: string | null;
    Categories: number[];
    Special_Message: string;
    Closest_Presentation_Date_Time: string;
    Slug: string;
    Show_Image: ShowImage;
  }
}
export interface ArtistAlbumData {
  albumReleaseDate: string
  albumImage: string
  albumName: string
  hitsName?: string
  hitsLink?: string
}
export interface ShowSlot {
  day: string
  time: string
  hour: string
  Event_ID: string
  dateTime: string
}
export interface ShowVenueTime {
  venueName: string
  price: string
  slots: ShowSlot[]
}