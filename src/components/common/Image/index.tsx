"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import fallbackImg from "@/assets/images/ImageNotFound-2.jpg";

const Images = ({ item }: { item: any }) => {
    const [src, setSrc] = useState(
        `https://kupatlv-test/api/features/${item?.Feature_ID}/media/contentDesktopImage?raw=1`
    );

    useEffect(() => {
        const handleResize = window.innerWidth <= 767;
        const primarySrc = `https://kupatlv-test/api/features/${item?.Feature_ID}/media/${
            handleResize ? "contentMobileImage" : "contentDesktopImage"
        }?raw=1`;
        setSrc(primarySrc);
    }, [item]);

    const handleImageError = () => {
        setSrc(item?.Feature_Image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.Feature_Image}` : fallbackImg.src);
    };

    return (
        <div className="img-wrap">
            <Image src={src} alt="artist-image" width={1024} height={1024} onError={handleImageError} />
        </div>
    );
};

export default Images;
