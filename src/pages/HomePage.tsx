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

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
    const [sectorAsBar, setSectorAsBar] = useState(false);
    const { data: allApplications } = useGetAllApplicationsQuery();

    const sectorData = [
        {
            name: 'Kelib tushgan arizalar',
            value: 320,
            color: '#3B82F6',
        },
        {
            name: 'Moderatsiyadagi arizalar',
            value: 245,
            color: '#10B981',
        },
        {
            name: 'Qabul qilingan',
            value: 180,
            color: '#F59E0B',
        },
        {
            name: "Sohalar bo'yicha ishlanmalar",
            value: 156,
            color: '#EF4444',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Modern Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl animate-pulse-slow animation-delay-4000"></div>

                    {/* Floating particles */}
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-float-${
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

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
                    <div className="text-center">
                        <div className="mb-6 overflow-hidden">
                            <Title
                                level={1}
                                className="!text-white !mb-0 !font-black !text-3xl md:!text-5xl lg:!text-6xl !leading-tight animate-slide-in-up"
                            >
                                <span className="inline-block animate-fade-in-up animation-delay-800">
                                    Yagona
                                </span>{' '}
                                <span className="inline-block animate-fade-in-up animation-delay-800">
                                    Ishlanmalar
                                </span>{' '}
                                <span className="inline-block animate-fade-in-up animation-delay-800">
                                    Bazasi
                                </span>
                            </Title>
                        </div>

                        {/* Subtitle with Animation */}
                        <Paragraph className="!text-xl md:!text-2xl !text-slate-200 !mb-12 max-w-4xl mx-auto !leading-relaxed font-light animate-fade-in-up animation-delay-1400">
                            Yangi ishlanmalar elektron bazasi axborot tizimi.
                            Innovatsiyalar va ilmiy ishlanmalarni rivojlantirish
                            uchun zamonaviy platforma.
                        </Paragraph>

                        {/* CTA Buttons with Animation */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-1600">
                            <Button
                                type="primary"
                                size="large"
                                className="group h-14 px-8 text-lg font-semibold border-0 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 text-white"
                            >
                                <span className="flex items-center gap-2">
                                    Ariza topshirish
                                </span>
                            </Button>
                            <Button
                                size="large"
                                className="group h-14 px-8 text-lg font-semibold bg-white/10 backdrop-blur-md border-white/20 text-white rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105"
                            >
                                <span className="flex items-center gap-2">
                                    Loyihalar
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Section */}
            <div className=" max-w-[1400px] mx-auto">
                <div className="py-12">
                    <div className="flex items-center justify-between mb-6">
                        <Title level={2} className="!mb-0">
                            Ishlanmalar
                        </Title>
                        <Button
                            type="primary"
                            href="/applications"
                            className="text-lg"
                        >
                            Hammasi
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4 mx-auto">
                        {allApplications?.results
                            .slice(0, 3)
                            .map((application) => (
                                <AllApplicationCard
                                    key={application.id}
                                    application={application}
                                />
                            ))}
                    </div>
                </div>

                {/* Statistics Section */}

                <div className="mx-auto ">
                    <Card
                        title={
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-xl ">
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
                        bodyStyle={{ padding: '32px' }}
                    >
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <ResponsiveContainer
                                width="100%"
                                height={400}
                                className="lg:w-1/2"
                            >
                                {sectorAsBar ? (
                                    <BarChart
                                        data={sectorData}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
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
                                            innerRadius={60}
                                            outerRadius={120}
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                {sectorData.map((item) => (
                                    <div
                                        key={item.name}
                                        className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-blue-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full group-hover:scale-125 transition-transform duration-300"
                                                style={{
                                                    backgroundColor: item.color,
                                                    boxShadow: `0 0 20px ${item.color}40`,
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-900 transition-colors duration-300">
                                                {item.name}
                                            </div>
                                            <div className="text-xs text-gray-500 font-medium">
                                                {item.value} ta loyiha
                                            </div>
                                        </div>
                                        <div
                                            className="text-2xl font-bold"
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
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 30px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes slide-in-up {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 100px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% { 
                        opacity: 0.4;
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.8;
                        transform: scale(1.1);
                    }
                }

                @keyframes float-0 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-10px) translateX(5px); }
                    50% { transform: translateY(-5px) translateX(-5px); }
                    75% { transform: translateY(-15px) translateX(3px); }
                }

                @keyframes float-1 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-15px) translateX(-8px); }
                    66% { transform: translateY(-8px) translateX(8px); }
                }

                @keyframes float-2 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-20px) translateX(-10px); }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .animate-slide-in-up {
                    animation: slide-in-up 1s ease-out forwards;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                .animate-float-0 {
                    animation: float-0 6s ease-in-out infinite;
                }

                .animate-float-1 {
                    animation: float-1 8s ease-in-out infinite;
                }

                .animate-float-2 {
                    animation: float-2 7s ease-in-out infinite;
                }

                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-800 { animation-delay: 0.8s; }
                .animation-delay-1000 { animation-delay: 1.0s; }
                .animation-delay-1200 { animation-delay: 1.2s; }
                .animation-delay-1400 { animation-delay: 1.4s; }
                .animation-delay-1600 { animation-delay: 1.6s; }
                .animation-delay-1800 { animation-delay: 1.8s; }
                .animation-delay-2000 { animation-delay: 2.0s; }
                .animation-delay-4000 { animation-delay: 4.0s; }

                /* Ensure animations start hidden */
                .animate-fade-in-up,
                .animate-slide-in-up {
                    opacity: 0;
                }

                /* Gradient text support for older browsers */
                .gradient-text {
                    background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </div>
    );
};

export default HomePage;
