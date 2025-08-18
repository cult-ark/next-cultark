export default function Loading() {
    return (
        <div className="container mx-auto px-4 pt-24 lg:pt-32 pb-8">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}