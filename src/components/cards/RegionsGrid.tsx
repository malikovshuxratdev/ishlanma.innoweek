interface Region {
    code: string;
    name: { uz: string };
    users_count: number;
    male_count: number;
    female_count: number;
    less40_count: number;
    scientific_degree_count: number;
    scientific_title_count?: number;
}

const RegionsGrid = () => {
    // Mahalliy vaqtinchalik data (keyinchalik API dan olinadi)
    const data: { regions: Region[] } = {
        regions: [
            {
                code: 'TN',
                name: { uz: 'Toshkent' },
                users_count: 1200,
                male_count: 600,
                female_count: 600,
                less40_count: 800,
                scientific_degree_count: 300,
                scientific_title_count: 150,
            },
            {
                code: 'AN',
                name: { uz: 'Andijon' },
                users_count: 950,
                male_count: 500,
                female_count: 450,
                less40_count: 620,
                scientific_degree_count: 210,
                scientific_title_count: 90,
            },
            {
                code: 'BU',
                name: { uz: 'Buxoro' },
                users_count: 760,
                male_count: 400,
                female_count: 360,
                less40_count: 500,
                scientific_degree_count: 180,
                scientific_title_count: 70,
            },
        ],
    };

    return (
        <div className="p-4 bg-gray-50 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold mb-3 px-1">
                Hududlar statistikasi
            </h2>
            <div className="flex flex-col space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {data.regions.map((region) => (
                    <div
                        key={region.code}
                        className="flex justify-between items-center bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                            {region.name.uz}
                        </span>
                        <span className="text-gray-900 font-semibold">
                            {region.users_count} ta
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegionsGrid;
