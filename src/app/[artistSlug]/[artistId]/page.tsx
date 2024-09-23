import Footer from "@/components/common/Footer";
import { PageWrapper } from "@/components/common/Wrappers";
import { getAllArtistData, getArtistPage, getArtistShowsDetail } from "@/redux/slices/artistSlice";
import { store } from "@/redux/store";
import { notFound } from "next/navigation";
import "./style.css";

interface ArtistProps {
    params: {
        artistSlug: string;
        artistId: string;
    };
}

export default async function Artist({ params }: Readonly<ArtistProps>) {
    const [_, allArtistDataResult] = await Promise.all([
        store.dispatch(getArtistShowsDetail({ artistId: params?.artistId })),
        store.dispatch(getAllArtistData({ slug: params?.artistSlug })),
        store.dispatch(getArtistPage()),
    ]);

    if (allArtistDataResult?.payload?.length === 0) {
        notFound();
    }

    return (
        <PageWrapper classes="artist-show-sec page-anim ">
            Show Artist page to show
            <Footer />
        </PageWrapper>
    );
}
