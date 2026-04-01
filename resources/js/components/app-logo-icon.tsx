import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return (
        <img
            {...props}
            src="/images/primelogo.png"
            alt="Prime Sp Zoo"
            className="size-9 object-contain"
        />
    );
}
