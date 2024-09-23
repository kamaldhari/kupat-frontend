const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_URL = {
	homePage: {
		featuredImage: `${BASE_URL}/homepage`,
		showByCategory: `${BASE_URL}/shows?populate=ShowImage,presentations`,
		newsLetter: `${BASE_URL}/news-letters`,
		grayArtits: `${BASE_URL}/gray-artists?populate=Feature_Image`,
		commyArtits: `${BASE_URL}/comy-artists?populate=Feature_Image`,
		searchArtists: `${BASE_URL}/artists`,
		settings: `${BASE_URL}/setting`
	},
	artistPage: {
		artistShow: `${BASE_URL}/shows`,
		artistBySlug: `${BASE_URL}/artists`,
		artistPage: `${BASE_URL}/artist-page`,
	},
	venuePage: {
		getVenueShows: `${BASE_URL}/venues`,
		getVenueDetails: `${BASE_URL}/venue-page`,
	},
};
