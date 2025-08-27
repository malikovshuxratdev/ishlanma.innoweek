import React, { useState } from 'react';
import { Card, Switch, Tooltip as AntTooltip, Button, Typography } from 'antd';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import InformationRegion from '../components/InformationRegion';
import { useGetAllApplicationsQuery } from '../hooks/useGetApplicationQuery';
import AllApplicationCard from '../components/cards/AllApplicationCard';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TokenService } from '../utils/storage';
import { useLogin } from '../hooks/useLogin';
import { useStatisticsQuery } from '../hooks/useStatisticsQuery';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
    const [sectorAsBar, setSectorAsBar] = useState(false);
    const { data: allApplications } = useGetAllApplicationsQuery();
    const { data: statisticsData } = useStatisticsQuery();
    const navigate = useNavigate();
    const token = TokenService.getToken();
    const { handleLogin } = useLogin();

    const handleArizaTopshirish = () => {
        if (token) {
            // If token exists, navigate directly to my-applications
            navigate('/my-applications');
        } else {
            // If no token, trigger login process
            handleLogin();
        }
    };

    const sectorData = [
        {
            name: 'Kelib tushgan arizalar',
            value: statisticsData?.overall?.draft,
            color: '#3B82F6',
        },
        {
            name: 'Kutilayotgan arizalar',
            value: statisticsData?.overall?.submitted,
            color: '#F59E0B',
        },
        {
            name: 'Tasdiqlangan arizalar',
            value: statisticsData?.overall?.approved,
            color: '#10B981',
        },
        {
            name: 'Rad etilgan arizalar',
            value: statisticsData?.overall?.rejected,
            color: '#EF4444',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <section className="relative min-h-[60vh] sm:min-h-[45vh] md:min-h-[50vh] lg:min-h-[55vh] xl:min-h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-800/80 to-slate-900/90"></div>

                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl animate-pulse-slow animation-delay-4000"></div>

                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-float-${
                                i % 3
                            }`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                            }}
                        ></div>
                    ))}
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center py-12 sm:py-16 md:py-20 lg:py-24">
                        <div className="text-center lg:text-left space-y-6 sm:space-y-8">
                            <div className="overflow-hidden">
                                <Title
                                    level={1}
                                    className="!text-white !mb-0 !font-black !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-7xl !leading-tight animate-slide-in-up font-['Inter',sans-serif]"
                                >
                                    <span className="inline-block animate-fade-in-up animation-delay-600">
                                        Yagona
                                    </span>{' '}
                                    <span className="inline-block animate-fade-in-up animation-delay-600">
                                        Ishlanmalar
                                    </span>{' '}
                                    <span className="inline-block animate-fade-in-up animation-delay-600">
                                        Bazasi
                                    </span>
                                </Title>
                            </div>

                            <Paragraph className="!text-base sm:!text-lg md:!text-xl lg:!text-2xl !text-slate-200 !mb-0 !leading-relaxed font-light animate-fade-in-up animation-delay-800 font-['Inter',sans-serif] max-w-2xl mx-auto lg:mx-0">
                                Yangi ishlanmalar elektron bazasi axborot
                                tizimi. Innovatsiyalar va ilmiy ishlanmalarni
                                rivojlantirish uchun zamonaviy platforma.
                            </Paragraph>
                        </div>

                        <div className="flex flex-col items-center lg:items-end justify-center space-y-4 sm:space-y-6 animate-fade-in-up animation-delay-800">
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleArizaTopshirish}
                                className="group p-4 sm:p-6 text-lg sm:text-xl font-bold border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="flex items-center gap-2 sm:gap-3">
                                    Ariza topshirish
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </span>
                            </Button>

                            <Button
                                size="large"
                                onClick={() => navigate('/applications')}
                                className="group p-4 sm:p-6 text-lg sm:text-xl font-semibold bg-white/10 backdrop-blur-md border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center gap-2 sm:gap-3">
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                    Loyihalar
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto">
                <div className="py-6 px-10 sm:px-0">
                    <div className="flex items-center justify-between mb-8">
                        <Title
                            level={2}
                            className="!mb-0 font-['Inter',sans-serif] !text-3xl"
                        >
                            Ishlanmalar
                        </Title>
                        <Button
                            type="link"
                            onClick={() => navigate('/applications')}
                            className="text-sm text-white font-['Inter',sans-serif] flex items-center gap-2"
                        >
                            Hammasi
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto">
                        {allApplications?.results &&
                        allApplications.results.length > 0 ? (
                            allApplications.results
                                .slice(0, 4)
                                .map((application) => (
                                    <AllApplicationCard
                                        key={application.id}
                                        application={application}
                                    />
                                ))
                        ) : (
                            // Fallback when no data
                            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <svg
                                        className="w-12 h-12 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-['Inter',sans-serif]">
                                    Hali ishlanmalar mavjud emas
                                </h3>
                                <p className="text-gray-600 max-w-md font-['Inter',sans-serif]">
                                    Yangi ishlanmalar qo'shilganda ular bu yerda
                                    ko'rinadi
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Responsive grid centering for single items */}
                    {allApplications?.results &&
                        allApplications.results.length === 1 && (
                            <style>{`
                            @media (min-width: 1024px) {
                                .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 {
                                    display: flex;
                                    justify-content: center;
                                }
                                .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > * {
                                    max-width: 400px;
                                    width: 100%;
                                }
                            }
                        `}</style>
                        )}
                </div>

                <div className="mx-auto">
                    <Card
                        title={
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-xl font-['Inter',sans-serif] font-semibold">
                                        Ishlanmalar statistikasi
                                    </div>
                                </div>
                                <AntTooltip
                                    title={
                                        sectorAsBar
                                            ? 'Doira diagramma'
                                            : 'Ustun diagramma'
                                    }
                                >
                                    <Switch
                                        checked={sectorAsBar}
                                        onChange={setSectorAsBar}
                                        checkedChildren="📊"
                                        unCheckedChildren="🥧"
                                        className="bg-gray-300 hover:bg-blue-500 transition-colors duration-300"
                                    />
                                </AntTooltip>
                            </div>
                        }
                        style={{ padding: '10px' }}
                        className="shadow-lg border-0 rounded-2xl overflow-visible"
                    >
                        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                            <ResponsiveContainer
                                width="100%"
                                height={350}
                                className="lg:w-1/2"
                            >
                                {sectorAsBar ? (
                                    <BarChart
                                        data={sectorData}
                                        margin={{
                                            top: 10,
                                            right: 20,
                                            left: 10,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#f0f0f0"
                                        />
                                        <XAxis dataKey="name" hide />
                                        <YAxis stroke="#666" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: 'none',
                                                borderRadius: '16px',
                                                boxShadow:
                                                    '0 10px 40px rgba(0,0,0,0.15)',
                                            }}
                                        />
                                        <Bar
                                            dataKey="value"
                                            radius={[12, 12, 0, 0]}
                                        >
                                            {sectorData.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={entry.color}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                ) : (
                                    <PieChart>
                                        <Pie
                                            data={sectorData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={100}
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {sectorData.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={entry.color}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: 'none',
                                                borderRadius: '16px',
                                                boxShadow:
                                                    '0 10px 40px rgba(0,0,0,0.15)',
                                            }}
                                        />
                                    </PieChart>
                                )}
                            </ResponsiveContainer>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full lg:w-1/2">
                                {sectorData.map((item) => (
                                    <div
                                        key={item.name}
                                        className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-blue-100"
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div
                                                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full group-hover:scale-125 transition-transform duration-300"
                                                style={{
                                                    backgroundColor: item.color,
                                                    boxShadow: `0 0 20px ${item.color}40`,
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs sm:text-sm font-semibold text-gray-900 truncate group-hover:text-blue-900 transition-colors duration-300 font-['Inter',sans-serif]">
                                                {item.name}
                                            </div>
                                            <div className="text-xs text-gray-500 font-medium font-['Inter',sans-serif]">
                                                {item.value} ta loyiha
                                            </div>
                                        </div>
                                        <div
                                            className="text-lg sm:text-xl lg:text-2xl font-bold font-['Inter',sans-serif]"
                                            style={{ color: item.color }}
                                        >
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                <InformationRegion />
            </div>
        </div>
    );
};

export default HomePage;
