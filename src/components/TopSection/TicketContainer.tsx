import React from "react";
import Ticket from "../common/cards/Tickets";
import ShowCard from "../common/cards/ShowCard";
import dayjs from "dayjs";
import { ShowCardData } from "@/app/interface/redux/homeSlice";
interface TicketProps {
    showByCategoryA: any;
    newBannerdata: any;
    showCardData: ShowCardData;
    showByCategoryB: any;
    pagewidth: any;
}
const TicketContainer = ({ showByCategoryA, newBannerdata, showCardData, showByCategoryB, pagewidth }: TicketProps) => {
    const processShowItems = (showItems: any) => {
        let showVenueTime: any = [];
        showItems?.attributes?.Events?.data?.forEach((venueItems: any) => {
            if (dayjs(venueItems?.attributes?.Date_Time).isBefore(dayjs(), "day")) {
                return;
            }
            let venueName = venueItems?.attributes?.Location_Name;
            let slot = {
                day: dayjs(venueItems?.attributes?.Date_Time).locale("he").format("dddd"),
                time: dayjs(venueItems?.attributes?.Date_Time).format("DD.MM"),
                Soldout: venueItems?.attributes?.Soldout,
                Event_ID: venueItems?.attributes?.Event_ID,
            };
            const existingVenue = showVenueTime.find((locationItem: any) => locationItem.venue === venueName);
            if (existingVenue) {
                existingVenue.slots.push(slot);
            } else {
                showVenueTime.push({
                    venue: venueName,
                    slots: [slot],
                });
            }
        });

        // Sort slots by timestamp for each venue
        showVenueTime.forEach((venue: any) => {
            venue.slots.sort((a: any, b: any) => {
                const dateA = dayjs(a.time, "DD.MM");
                const dateB = dayjs(b.time, "DD.MM");
                return dateA.valueOf() - dateB.valueOf();
            });
        });

        const handleResize = pagewidth <= 764;
        const mobileImageUrl = showItems?.attributes?.Show_Image?.Mobile_Image?.data?.attributes?.url;
        const webImageUrl = showItems?.attributes?.Show_Image?.Web_Image?.data?.attributes?.url;
        const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
        const showId = showItems?.attributes?.Show_ID;
        const imageSize = handleResize ? "contentMobileImage" : "contentDesktopImage";

        // Extracted showImage URL logic into an independent statement
        let showImage = "";

        if (handleResize) {
            if (mobileImageUrl) {
                showImage = `${baseUrl}${mobileImageUrl}`;
            } else {
                showImage = `https://kupatlv-test/api/features/${showId}/media/${imageSize}?raw=1`;
            }
        } else if (webImageUrl) {
            showImage = `${baseUrl}${webImageUrl}`;
        } else {
            showImage = `https://kupatlv-test/api/features/${showId}/media/${imageSize}?raw=1`;
        }

        return {
            featureCategoryName: showItems?.attributes?.Name,
            showVenueTime,
            Artist_Url: showItems?.Artist_Url,
            Feature_Description: showItems?.attributes?.Synopsis,
            Feature_Id: showItems?.attributes?.Show_ID,
            Slug: showItems?.attributes?.Slug,
            allSoldOut: showItems?.attributes?.Events?.data?.every((v: any) => v?.attributes?.Soldout),
            isLessTicket: showItems?.attributes?.Events?.data?.every((v: any) => v?.attributes?.Avail_Ratio < 0.15),
            dateTime: showItems?.attributes?.Closest_Presentation_Date_Time,
            ArtistSlug: showItems?.attributes?.Artists?.data[0]?.attributes?.Slug,
            showImage,
        };
    };

    return (
        <>
            {" "}
            {showByCategoryA?.map((showItems: { attributes: { Show_ID: any }; id: React.Key | null | undefined }) => {
                if (newBannerdata?.bannerFeatureId !== showItems?.attributes?.Show_ID) {
                    return <Ticket key={showItems.id} data={processShowItems(showItems)} dynamicClass="ticket-item" />;
                }
            })}
            {showCardData.displayShowCard && showCardData.Show_Card_Placement === "CENTER" && (
                <ShowCard data={showCardData} dynamicClass="ticket-item" />
            )}
            {showByCategoryB?.map((showItems: { id: React.Key | null | undefined }) => {
                return <Ticket key={showItems.id} data={processShowItems(showItems)} dynamicClass="ticket-item" />;
            })}
        </>
    );
};

export default TicketContainer;
