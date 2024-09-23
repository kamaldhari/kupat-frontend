import { API_URL } from "@/Constants/api";
import { ArtistData, BannerData, SettingDetails, ShowCardData, ShowCategoryData } from "@/app/interface/redux/homeSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
    loading: boolean
    bannerData: BannerData
    showCardData: ShowCardData
    loadingByCategory: boolean
    showByCategoryA: ShowCategoryData[]
    showByCategoryB: ShowCategoryData[]
    commyArtist: ArtistData[]
    grayArtist: ArtistData[]
    venueArtists: ArtistData[]
    settingDetails: SettingDetails
}
const initialState: InitialState = {
    loading: false,
    bannerData: {} as BannerData,
    showCardData: {} as ShowCardData,
    showByCategoryA: [] as ShowCategoryData[],
    showByCategoryB: [] as ShowCategoryData[],
    commyArtist: [] as ArtistData[],
    grayArtist: [] as ArtistData[],
    venueArtists: [],
    settingDetails: {} as SettingDetails,
    loadingByCategory: false
}

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;


export const getShowByCategory = createAsyncThunk('home/getShowByCategory', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL.homePage.showByCategory}`)
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})

export const createNewsLetter = createAsyncThunk('home/createNewsLetter', async ({ payload }: { payload: any }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${API_URL.homePage.newsLetter}`, { data: payload })
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})
export const getCommyArtist = createAsyncThunk('home/getCommyArtist', async (_, { rejectWithValue }) => {
    try {
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];
        const dateAfter15Days = new Date(currentDate);
        dateAfter15Days.setDate(currentDate.getDate() + 7);
        const formattedDateAfter15Days = dateAfter15Days.toISOString().split('T')[0];
        const { data } = await axios.get(`${API_URL.homePage.commyArtits}&filters[Date_Time][$gte]=${formattedCurrentDate}T00:00:00.000Z&filters[Date_Time][$lte]=${formattedDateAfter15Days}T23:59:59.999Z&sort=Date_Time:asc`)
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})
export const getGrayArtist = createAsyncThunk('home/getgrayArtist', async (_, { rejectWithValue }) => {
    try {
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];
        const dateAfter15Days = new Date(currentDate);
        dateAfter15Days.setDate(currentDate.getDate() + 7);
        const formattedDateAfter15Days = dateAfter15Days.toISOString().split('T')[0];
        const { data } = await axios.get(`${API_URL.homePage.grayArtits}&filters[Date_Time][$gte]=${formattedCurrentDate}T00:00:00.000Z&filters[Date_Time][$lte]=${formattedDateAfter15Days}T23:59:59.999Z&sort=Date_Time:asc`)
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})
export const searchArtist = createAsyncThunk('home/searchArtist', async ({ search }: { search: string }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL.homePage.searchArtists}?filters[Name][$contains]=${search}&populate=Shows.Events,Artist_Image`)
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})
export const getSettings = createAsyncThunk('home/getSettings', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL.homePage.settings}?populate=WhatsApp_Number,Footer,Footer.Footer_Link`)
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }

})
export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCommyArtist.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getCommyArtist.fulfilled, (state, { payload }) => {
            state.loading = false
            state.commyArtist = payload?.map((items: any) => ({ ...items?.attributes, Feature_Image: items?.attributes?.Feature_Image?.data?.attributes?.url, locationName: items?.attributes?.Location, description: items?.attributes?.Date_Time, presentationId: items?.attributes?.Presentation_ID }))
        })
        builder.addCase(getCommyArtist.rejected, (state, { payload }) => {
            state.loading = false
        })
        builder.addCase(getGrayArtist.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getGrayArtist.fulfilled, (state, { payload }) => {
            state.loading = false
            state.grayArtist = payload?.map((items: any) => ({ ...items?.attributes, Feature_Image: items?.attributes?.Feature_Image?.data?.attributes?.url, locationName: items?.attributes?.Location, description: items?.attributes?.Date_Time, presentationId: items?.attributes?.Presentation_ID }))
        })
        builder.addCase(getGrayArtist.rejected, (state, { payload }) => {
            state.loading = false
        })
        builder.addCase(getSettings.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getSettings.fulfilled, (state, { payload }) => {
            state.loading = false
            state.settingDetails = {
                Country_Code: payload?.attributes?.WhatsApp_Number?.Country_Code,
                Phone: payload?.attributes?.WhatsApp_Number?.Phone,
                Address: payload?.attributes?.Footer?.Address[0]?.children[0]?.text,
                Facebook: payload?.attributes?.Footer?.Facebook,
                Instagram: payload?.attributes?.Footer?.Instagram,
                Customer_Service: payload?.attributes?.Footer?.Customer_Service,
                Footer_Link: payload?.attributes?.Footer?.Footer_Link

            }
        })
        builder.addCase(getSettings.rejected, (state, { payload }) => {
            state.loading = false
        })
    }
})
export default homeSlice.reducer