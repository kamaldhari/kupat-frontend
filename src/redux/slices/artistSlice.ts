import { API_URL } from "@/Constants/api";
import { Artist, ArtistButton, ArtistAlbumData, ArtistPage, ArtistShowDetail, MetaDetails, SocialLink } from "@/app/interface/redux/artistSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
	loading: boolean;
	Meta_details: MetaDetails;
	Artist_Button: ArtistButton;
	Artist_Description: string;
	Social_link: SocialLink;
	Artist: Artist;
	artistShows: ArtistShowDetail[];
	ArtistPage: ArtistPage;
	AllArtistData: [];
	Gallery_Images: [];
	artistHitsAlbums: ArtistAlbumData[]
	artistAlbums: ArtistAlbumData[]
}
const initialState: InitialState = {
	loading: false,
	Meta_details: {} as MetaDetails,
	Artist_Button: {} as ArtistButton,
	Social_link: {} as SocialLink,
	Artist: {} as Artist,
	ArtistPage: {} as ArtistPage,
	AllArtistData: [],
	Artist_Description: "",
	Gallery_Images: [],
	artistAlbums: [],
	artistHitsAlbums: [],
	artistShows: [] as ArtistShowDetail[],
};

axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;
export const getAllArtistData = createAsyncThunk("artist/getAllArtistData", async ({ slug }: { slug: string }, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(`${API_URL.artistPage.artistBySlug}?filters[Slug]=${slug}&populate=Shows&populate=Shows.Show_Image.Web_Image,Shows.Show_Image.Mobile_Image,Artist_Image,Artist_Gallery,Artist_Gallery.Gallery_Images`);
		return data.data;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export const getArtistShowsDetail = createAsyncThunk("artist/getArtistShowsDetail", async ({ artistId }: { artistId: string }, { rejectWithValue }) => {
	try {

		const { data } = await axios.get(`${API_URL.artistPage.artistShow}?filters[Show_ID]=${artistId}&populate=Events&populate=Artists,Agent_Tickets,Show_Image.Mobile_Image,Show_Image.Web_Image,About_Show,About_Show.Categories,About_Show,About_Show.Time_Duration,About_Show,About_Show.Age,About_Show,About_Show.Door_Open,About_Show,About_Show.Price,About_Show,About_Show.Camera,F_AND_Q`);
		return data?.data;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
export const getArtistPage = createAsyncThunk("artist/getArtistPage", async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(
			`${API_URL.artistPage.artistPage}?populate=Meta_details.Card_Benifits,Meta_details.Card_Benifits.Card_Image,Artist_Social_Links ,Meta_details.About_Show,Meta_details.FAQ,Artist_Button,,Artist_Gallery,Artist_Gallery.Gallery_Images `,
		);
		return data.data?.attributes;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});

export const artistSlice = createSlice({
	name: "artist",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getArtistShowsDetail.pending, (state: InitialState, action) => {
			state.loading = true;
		});
		builder.addCase(getArtistShowsDetail.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.artistShows = payload;
		});
		builder.addCase(getArtistShowsDetail.rejected, (state, action) => {
			state.loading = false;
		});

		builder.addCase(getArtistPage.pending, (state: InitialState, action) => {
			state.loading = true;
		});
		builder.addCase(getArtistPage.fulfilled, (state, { payload }) => {
			const artistPage = {
				Meta_details: payload?.Meta_details,
				Artist_Button: payload?.Artist_Button,
				Social_link: payload?.Artist_Social_Links,
				Artist_Description: payload?.Artist_Description,
				Show_Info: payload?.Show_Info,
				Gallery_Images: payload?.Artist_Gallery?.Gallery_Images?.data,
			};
			state.loading = false;
			state.ArtistPage = artistPage;
		});
		builder.addCase(getArtistPage.rejected, (state, action) => {
			state.loading = false;
		});

		builder.addCase(getAllArtistData.pending, (state: InitialState, action) => {
			state.loading = true;
		});
		builder.addCase(getAllArtistData.fulfilled, (state, { payload }) => {
			state.AllArtistData = payload;
			state.loading = false;
		});
		builder.addCase(getAllArtistData.rejected, (state, action) => {
			state.loading = false;
		});
	},
});
export default artistSlice.reducer;
