import Footer from "@/components/common/Footer";
import NewsLaterForm from "@/components/common/NewsLaterForm";
import { PageWrapper } from "@/components/common/Wrappers";
import TopSection from "@/components/TopSection";
import { bannerData, showByCategoryA, showByCategoryB, showCardData } from "@/Constants/data";
import dayjs from "dayjs";
import "dayjs/locale/he";
import { headers } from "next/headers";
import "../style.css";
dayjs.locale("he");

const getInitialWidthFromUserAgent = (): number => {
    const userAgent = headers().get("user-agent") ?? "";
    if (/mobile/i.test(userAgent)) {
        return 375;
    }
    return 1024;
};

export default async function Home() {
    // eslint-disable-next-line sonarjs/no-commented-out-code
    // const [] = await Promise.all([
    //     store.dispatch(getFeatureImage()),
    //     store.dispatch(getShowByCategory()),
    //     store.dispatch(getGrayArtist()),
    //     store.dispatch(getCommyArtist()),
    // ]);
    // const { bannerData, showCardData, showByCategoryA, showByCategoryB, grayArtist, commyArtist, venueArtists } =
    //     store.getState().home;

    const pagewidth = getInitialWidthFromUserAgent();
    return (
        <PageWrapper classes="inner-main-wrapper page-anim">
            <TopSection
                pagewidth={pagewidth}
                showByCategoryA={showByCategoryA}
                showCardData={showCardData}
                showByCategoryB={showByCategoryB}
                bannerData={bannerData}
            />
            <section className="section multi-sec-wrap">
                <NewsLaterForm
                    submitBtnText="הרשמה"
                    title="איך תתפסו מקומות מבלי לדעת?"
                    subTitle="הישארו מעודכנים ותהיו ראשונים לרכוש כרטיסים"
                />
                <Footer />
            </section>
        </PageWrapper>
    );
}
