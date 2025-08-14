
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface HorizontalFeatureCardProps {
    useContainer?: boolean;
    title?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    className?: string;
}

export function HorizontalFeatureCard({
    useContainer = true,
    title = "Optimized Performance",
    description = "Our infrastructure is fine-tuned for speed and reliability, ensuring a seamless user experience even at scale. The horizontal layout allows for a clear separation of visual and textual content.",
    imageUrl = "https://images.unsplash.com/photo-1554629947-334ff61d85dc",
    imageAlt = "Mountain landscape",
    className = ""
}: HorizontalFeatureCardProps) {
    const containerClasses = useContainer
        ? "container-80" // Bootstrap-like container with 80% width
        : "w-full";

    return (
        <div className={containerClasses}>
            <Card className={`w-full overflow-hidden shadow-lg ${className}`}>
                {/* Main flex container - horizontal on desktop, vertical on mobile */}
                <div className="flex flex-col lg:flex-row">

                    {/* Image Container */}
                    <div className="w-full lg:w-2/5 flex-shrink-0">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-64 sm:h-72 lg:h-80 xl:h-full object-cover"
                        />
                    </div>

                    {/* Text Content Container */}
                    <div className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
                        <CardHeader className="p-0 mb-4 lg:mb-6">
                            <CardTitle className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <CardDescription className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed">
                                {description}
                            </CardDescription>
                        </CardContent>
                    </div>

                </div>
            </Card>
        </div>
    );
}

// Default export for easier importing
export default HorizontalFeatureCard;