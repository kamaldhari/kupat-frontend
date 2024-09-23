import { API_URL } from "@/Constants/api";
import { VenueDetail, VenueShowsData } from "@/app/interface/redux/venueSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface InitialStateProps {
	venueShowData: VenueShowsData[];
	venueDetail: VenueDetail;
	aboutVanue: any;
	loading: boolean;
	error: string;
}
const initialState: InitialStateProps = {
	venueShowData: [],
	venueDetail: {} as VenueDetail,
	loading: false,
	error: "",
	aboutVanue: {},
};

axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;

export const getVenueShows = createAsyncThunk("home/getVenueShows", async ({ slug }: { slug: string }, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(
			`${API_URL.venuePage.getVenueShows}?filters[Slug][$eq]=${slug}&populate=Venue_Image,Venue_Feature_Video,Events,Events.Show,Events.Show.Show_Image.Web_Image,Events.Show.Show_Image.Mobile_Image,Events.Show.Artists,Events.Show.Artists.Artist_Gallery,Events.Show.Artists.Artist_Gallery.Gallery_Images,Agent_Ticket,F_AND_Q,About_Venue,About_Venue.Categories,About_Venue.Time_Duration,About_Venue.Age,About_Venue.Door_Open,About_Venue.Price,About_Venue.Camera,Events.Show.Artists.Artist_Image`,
		);
		return data.data;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export const getVenueDetail = createAsyncThunk("home/getVenueDetail", async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(
			`${API_URL.venuePage.getVenueDetails}?populate=Venue_Image,Venue_Video,Social_Link,Show_Details.Card_Benifits,Show_Details.Card_Benifits.Card_Image,Show_Details.About_Show,Show_Details.FAQ,Gallery.Gallery_Images,`,
		);
		return data.data;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});

export const venueSlice = createSlice({
	name: "venue",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getVenueShows.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getVenueShows.fulfilled, (state, { payload }) => {
			function groupEventsByShow(apiResponse: any[]) {
				const groupedEventsMap: any = {};

				apiResponse?.forEach((venue) => {
					venue?.attributes?.Events?.data?.forEach((event: { attributes: { [x: string]: any; Show: any; }; id: any; }) => {
						const showName = event?.attributes?.Show?.data?.attributes?.Name;
						const showId = event?.attributes?.Show?.data?.id;
						const showDetails = event?.attributes?.Show?.data?.attributes;

						if (!groupedEventsMap[showName]) {
							groupedEventsMap[showName] = {
								showId,
								showDetails,
								events: [],
							};
						}

						const { Show, ...eventDetails } = event.attributes;
						groupedEventsMap[showName]?.events?.push({
							id: event?.id,
							attributes: eventDetails,
						});
					});
				});

				return Object.values(groupedEventsMap);
			}
			const response: any = groupEventsByShow(payload);
			state.venueShowData = response;
			state.aboutVanue = payload?.length > 0 ? {
				displayGallery: payload[0]?.attributes?.Display_Gallery,
				displayFAQ: payload[0]?.attributes?.Display_FAQ,
				displayAboutVenue: payload[0]?.attributes?.Display_About_Venue,
				displayAgentTickets: payload[0]?.attributes?.Display_Agent_Tickets,
				Title: payload[0]?.attributes?.Name || "",
				Description: payload[0]?.attributes?.Description || "",
				Venue_Image: payload[0]?.attributes?.Venue_Image?.data?.attributes?.url,
				Venue_Video: payload[0]?.attributes?.Venue_Feature_Video?.data?.attributes?.url,
				Agent_Ticket: payload[0]?.attributes?.Agent_Ticket ? [...payload[0].attributes.Agent_Ticket] : [],
				F_AND_Q: payload[0]?.attributes?.F_AND_Q ? [...payload[0].attributes.F_AND_Q] : [],
				Special_Message: payload[0]?.attributes?.Special_Message,
				venueId: payload[0]?.attributes?.Venue_ID,
				wazeLink: payload[0]?.attributes?.Location_Direction_Link_Waze,
				About_Venue: payload[0]?.attributes?.About_Venue
			} : {};
			state.loading = false;
		});
		builder.addCase(getVenueShows.rejected, (state) => {
			state.venueShowData = [];
			state.loading = false;
		});
		builder.addCase(getVenueDetail.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getVenueDetail.fulfilled, (state, { payload }) => {
			state.venueDetail = {
				...payload?.attributes,
				Venue_Image: payload?.attributes?.Venue_Image?.data?.attributes?.url,
				Venue_Video: payload?.attributes?.Venue_Video?.data?.attributes?.url,
			};
			state.loading = false;
		});
		builder.addCase(getVenueDetail.rejected, (state) => {
			state.venueShowData = [];
			state.loading = false;
		});
	},
});
export default venueSlice.reducer;
