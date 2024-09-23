"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import fallbackImg from "@/assets/images/ImageNotFound.jpg"

const FallBackImg = ({ url, }: { url: any }) => {
    const [src, setSrc] = useState(url);

    useEffect(() => {
        setSrc(url);
    }, [url]);

    const handleImageError = () => {
        setSrc(fallbackImg.src);
    };

    return (
        <Image
            src={src}
            alt="artist-image"
            width={1024}
            height={1024}
            onError={handleImageError}
        />
    );
}

export default FallBackImg
