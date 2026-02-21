interface ImagePlaceholderProps {
    className?: string;
}

export default function ImagePlaceholder({ className = '' }: ImagePlaceholderProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="No image available"
        >
            <rect width="200" height="200" fill="#f1f5f9" />
            {/* Frame */}
            <rect x="40" y="40" width="120" height="120" rx="6" fill="#e2e8f0" />
            {/* Mountain / image icon */}
            <path d="M55 140 L85 100 L105 120 L130 90 L155 140 Z" fill="#cbd5e1" />
            {/* Sun circle */}
            <circle cx="145" cy="75" r="14" fill="#cbd5e1" />
            {/* Subtle label */}
            <text
                x="100"
                y="170"
                textAnchor="middle"
                fontSize="11"
                fill="#94a3b8"
                fontFamily="system-ui, sans-serif"
            >
                No image
            </text>
        </svg>
    );
}
