import { ShowCardData } from "@/app/interface/redux/homeSlice";
import { formateDate } from "@/helpers";
import { GetTimeDifference } from "@/utils";
import dayjs from "dayjs";
import HomeBanner from "../HomeBanner";
import ShowCard from "../common/cards/ShowCard";
import TicketContainer from "./TicketContainer";

interface TopsectionProps {
    showByCategoryA: any;
    showCardData: ShowCardData;
    showByCategoryB: any;
    bannerData: any;
    pagewidth: any;
}

const TopSection = async ({
    showByCategoryA,
    showCardData,
    showByCategoryB,
    bannerData,
    pagewidth,
}: TopsectionProps) => {
    let data: any = [];
    let newBannerdata;

    const getRandomdData = (arr: any[]) => {
        if (!arr?.length) {
            return;
        }
        const randomIndex = Math.floor(Math.random() * arr?.length);
        return arr[randomIndex];
    };
    const randomFeatureShow = getRandomdData(bannerData?.attributes?.Feature_Show?.data)?.attributes;
    const Banner = bannerData?.attributes?.Banner || "";
    const showCard = bannerData?.attributes?.Show_Card;
    const arr = {
        ...Banner,
        Featured_Image: randomFeatureShow?.Show_Image?.data?.attributes?.url,
        Featured_Video: randomFeatureShow?.Show_Video?.data?.attributes?.url,
        Title: randomFeatureShow?.Name,
        Sub_Title: formateDate(randomFeatureShow?.Date_Started),
        bannerFeatureId: randomFeatureShow?.Show_ID,
        bannerFeatureDescription: randomFeatureShow?.Synopsis,
        Description: showCard?.Description,
        Button_Link:
            randomFeatureShow?.Artists?.data?.length > 0
                ? `/${randomFeatureShow?.Artists?.data[0]?.attributes?.Slug}/${randomFeatureShow?.Show_ID}`
                : `/#`,
        Artist_Url: randomFeatureShow?.Artist_Url,
        Button_Text: randomFeatureShow?.Date_Started
            ? `${GetTimeDifference(randomFeatureShow?.Date_Started)} לתחילת המכירה`
            : "המכירה תתחיל בקרוב",
    };

    newBannerdata = { ...arr };

    if (showCardData.Show_Card_Placement === "CENTER") {
        data = [...showByCategoryA, showCardData, ...showByCategoryB];
    } else if (showCardData.Show_Card_Placement === "TOP") {
        data = [showCardData, ...showByCategoryA, ...showByCategoryB];
    } else if (showCardData.Show_Card_Placement === "BOTTOM") {
        data = [...showByCategoryA, ...showByCategoryB, showCardData];
    }
    let venueTime: any = [];
    data[0]?.data?.map((e: any) => {
        let venueTimeAdjust = {
            venue: e?.locationName,
            slots: [
                {
                    day: dayjs(e?.businessDate).locale("he").format("dddd"),
                    time: dayjs(e?.businessDate).format("DD.MM"),
                },
            ],
        };
        e.businessDate && venueTime.push({ ...venueTimeAdjust });
    });

    return (
        <>
            <HomeBanner bannerData={newBannerdata} />
            {showCardData.displayShowCard && showCardData.Show_Card_Placement === "TOP" && (
                <ShowCard data={showCardData} dynamicClass="ticket-item" />
            )}

            <TicketContainer
                pagewidth={pagewidth}
                newBannerdata={newBannerdata}
                showByCategoryA={showByCategoryA}
                showByCategoryB={showByCategoryB}
                showCardData={showCardData}
            />

            {showCardData.displayShowCard && showCardData.Show_Card_Placement === "BOTTOM" && (
                <ShowCard data={showCardData} dynamicClass="ticket-item" />
            )}
        </>
    );
};

export default TopSection;
