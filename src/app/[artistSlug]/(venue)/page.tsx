import { FacebookWhiteIcon, InstagramWhiteIcon, wageIcon } from "@/assets/icons";
import FallBackImg from "@/components/common/Image/FallBackImg";
import { PageWrapper } from "@/components/common/Wrappers";
import { getVenueDetail, getVenueShows } from "@/redux/slices/venueSlice";

import { getAllArtistData } from "@/redux/slices/artistSlice";
import { store } from "@/redux/store";
import dayjs from "dayjs";
import "dayjs/locale/he";
import Link from "next/link";
import { notFound } from "next/navigation";
import Artist from "../[artistId]/page";
import "../style.css";
dayjs.locale("he");

interface VenueProps {
    params: {
        artistSlug: string;
    };
}

export default async function Venue({ params }: Readonly<VenueProps>) {
    const [VenueShowsResult, allArtistDataResult] = await Promise.all([
        store.dispatch(getVenueShows({ slug: params?.artistSlug })),
        store.dispatch(getVenueDetail()),
        store.dispatch(getAllArtistData({ slug: params?.artistSlug })),
    ]);

    if (VenueShowsResult?.payload?.length === 0 && allArtistDataResult?.payload?.length === 0) {
        notFound();
    } else if (allArtistDataResult?.payload?.length > 0) {
        return <Artist params={{ ...params, artistId: "" }} />;
    }

    const { venueShowData, venueDetail, aboutVanue } = store.getState().venue;

    let galleryArray: any = [];
    venueShowData?.map((data: any) => {
        let gallery: any = data?.showDetails?.Artists?.data[0]?.attributes?.Artist_Gallery?.Gallery_Images?.data;
        gallery && galleryArray.push(gallery);
    });
    return (
        <PageWrapper classes="venu-container page-anim">
            <section className="kpt-sub-banner no-padding section">
                <div className="kpt-sub-banner-inner">
                    <div className="kpt-vdo-img-wrap">
                        <div className="img-wrapper">
                            <div className="img-wrap">
                                <FallBackImg url={`${process.env.NEXT_PUBLIC_IMAGE_URL}${venueDetail?.Venue_Image}`} />
                            </div>
                        </div>
                    </div>
                    <div className="banner-info-wrap doodle">
                        <div className="inner-info-wrap">
                            <div className="title-wrap">
                                <h1 style={{ color: "#fff" }}>{aboutVanue?.Title}</h1>
                            </div>
                            <div className="sub-info">
                                <p>{aboutVanue?.Description}</p>
                            </div>
                            <div className="kpt-social-links">
                                <ul className="social-link">
                                    <li>
                                        <Link
                                            href={aboutVanue?.wazeLink || "/"}
                                            className="SocialEmojiss-link"
                                            target="_blank"
                                        >
                                            {wageIcon}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={
                                                aboutVanue?.venueId
                                                    ? `https://kupatlv-test.presglobal.store/api/venues/${aboutVanue?.venueId}/media/instagramLink`
                                                    : "/"
                                            }
                                            className="SocialEmojiss-link"
                                            target="_blank"
                                        >
                                            {InstagramWhiteIcon}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={
                                                aboutVanue?.venueId
                                                    ? `https://kupatlv-test.presglobal.store/api/venues/${aboutVanue?.venueId}/media/facebookLink`
                                                    : "/"
                                            }
                                            className="SocialEmojiss-link"
                                            target="_blank"
                                        >
                                            {FacebookWhiteIcon}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
