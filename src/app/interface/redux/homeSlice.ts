import { SlotsData } from "./venueSlice";

export interface BannerData {
	id: number;
	Featured_Image: string;
	Featured_Video: string;
	Title: string;
	Sub_Title: string;
	Description: string;
	bannerFeatureId: string;
	Button_Text: string;
	Button_Link: string;
	Artist_Url: string;
	bannerFeatureDescription: string;
}
export interface ShowCardData {
	id: number;
	Image: string;
	Title: string;
	Sub_Title: string;
	Description: string;
	Show_Card_Placement: string;
	Button_Text: string;
	Button_Link: string;
	displayShowCard: boolean;
}

export interface ShowData {
	id: number;
	dateTime: string;
	featureName: string;
	featureAdditionalName?: string;
	featureId: number;
	description: string;
	venueName: string;
	soldout: boolean;
	featureImage: string;
	dayTime: { day: string; time: string }[];
}
export interface ArtistData {
	venueSlug?: string;
	Feature_ID?: any;
	artist_Slug?: any;
	Feature_Name?: string;
	Feature_Id?: string;
	Feature_Image?: string;
	locationName?: string;
	description?: string;
	presentationId: string;
}

export interface ShowCategoryData {
	attributes: any;
	id?: number;
	featureCategoryId?: number;
	featureCategoryName?: string;
	Select_Category?: string;
	ShowImage?: { data: { attributes: { url: string } } };
	dateTime: string;
	featureImage?: string;
	showImage?: string;
	soldout?: boolean;
	featureCategoryImage?: string;
	featureDescription?: string;
	showVenuTime: [{ venue: string; slots: SlotsData[] }];
	data?: ShowData[];
}
export interface SearchSuggestionData {
	featureId: number;
	artistLink?: string;
	featureName: string;
	artist_Image: string;
	dayDate?: { time: number; day: string }[];
}
interface FooterLinkData {
	Label: string;
	Link: string;
}
export interface SettingDetails {
	Country_Code: string;
	Phone: string;
	Address: string;
	Facebook: string;
	Instagram: string;
	Customer_Service: string;
	Footer_Link: FooterLinkData[];
}
