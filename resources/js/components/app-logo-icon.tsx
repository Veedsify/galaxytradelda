import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return (
        <img
            {...props}
            src="/images/primelogo.png"
            alt="PrimeSpZoo"
            className="size-9 object-contain"
        />
    );
}
