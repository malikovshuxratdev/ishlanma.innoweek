import React, { useState } from 'react';
import { Row, Col, Card, Switch, Tooltip as AntTooltip } from 'antd';
import {
    GlobalOutlined,
    RiseOutlined,
    ArrowDownOutlined,
} from '@ant-design/icons';
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

const HomePage: React.FC = () => {
    const sectorData = [
        { name: 'Information Technology', value: 320, color: '#3B82F6' },
        { name: 'Biotechnology', value: 245, color: '#10B981' },
        { name: 'Energy & Environment', value: 180, color: '#F59E0B' },
        { name: 'Medicine & Healthcare', value: 156, color: '#EF4444' },
        { name: 'Agriculture', value: 89, color: '#8B5CF6' },
        { name: 'Manufacturing', value: 67, color: '#06B6D4' },
    ];

    const regionData = [
        { region: 'Tashkent', developments: 456 },
        { region: 'Samarkand', developments: 234 },
        { region: 'Bukhara', developments: 189 },
        { region: 'Fergana', developments: 167 },
        { region: 'Andijan', developments: 134 },
        { region: 'Namangan', developments: 98 },
    ];

    // Chart view toggle (Pie / Bar)
    const [sectorAsBar, setSectorAsBar] = useState(false);

    const scrollToStats = () => {
        document
            .getElementById('stats')
            ?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="animate-fade-in">
            {/* === Beautiful Hero Banner === */}
            <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
                {/* Background Banner Image */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-gradient-to-br from-blue-900/80 via-indigo-900/80 to-purple-900/80"></div>
                    {/* Background image with overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                        style={{
                            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern><radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(59,130,246,0.3)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23grid)"/><circle cx="300" cy="200" r="100" fill="url(%23glow)"/><circle cx="900" cy="600" r="150" fill="url(%23glow)"/><circle cx="600" cy="400" r="80" fill="url(%23glow)"/></svg>')`,
                        }}
                    ></div>

                    {/* Floating geometric elements */}
                    <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-300/30 rounded-lg rotate-45 animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-2 border-purple-300/30 rounded-full animate-pulse animation-delay-1000"></div>
                    <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-lg rotate-12 animate-pulse animation-delay-3000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <div className="backdrop-blur-md bg-white/90 border border-white/30 rounded-3xl p-8 md:p-16 shadow-2xl">
                        {/* Main Heading */}
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-8">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                                Yangi ishlanmalar elektron bazasi axborot
                                tizimi.
                            </span>
                            <span className="mt-4 block text-gray-700 font-light text-sm sm:text-lg lg:text-xl"></span>
                        </h1>

                        {/* Enhanced Stats Preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-8">
                            {[
                                {
                                    label: 'Kelib tushgan arizalar soni',
                                    value: 1200,
                                    suffix: '+',
                                },
                                {
                                    label: 'Moderatsiya arizalar soni',
                                    value: 450,
                                    suffix: '+',
                                },
                                {
                                    label: 'qabul qilingan arizalar soni',
                                    value: 89,
                                    suffix: '+',
                                },
                                {
                                    label: 'Sohalar kesimida  ishlanmalar soni',
                                    value: 67,
                                    suffix: '+',
                                },
                                {
                                    label: 'Hududlar kesimida  ishlanmalar soni',
                                    value: 67,
                                    suffix: '+',
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="text-center p-6 rounded-2xl bg-white/80 border border-white/40 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    <div className="text-xl font-bold text-gray-800 mb-2">
                                        {stat.value}
                                        {stat.suffix}
                                    </div>
                                    <div className="text-lg font-semibold text-gray-700 mb-2">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <button
                    onClick={scrollToStats}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white hover:text-blue-200 flex flex-col items-center gap-2 group transition-all duration-300"
                >
                    <span className="text-sm font-medium">Discover More</span>
                    <div className="w-6 h-10 rounded-full border-2 border-white/50 group-hover:border-blue-300 flex items-start justify-center p-1 transition-colors duration-300">
                        <ArrowDownOutlined className="text-white group-hover:text-blue-200 animate-bounce" />
                    </div>
                </button>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-20">
                {/* Charts Section */}
                <Row gutter={[32, 32]} className="mb-20">
                    <Col xs={24} lg={12}>
                        <Card
                            title={
                                <div className="flex items-center justify-between gap-2">
                                    <span className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                        <GlobalOutlined className="text-blue-500" />
                                        <span>Projects by Sector</span>
                                    </span>
                                    <AntTooltip
                                        title={
                                            sectorAsBar
                                                ? 'Show Pie Chart'
                                                : 'Show Bar Chart'
                                        }
                                    >
                                        <Switch
                                            size="default"
                                            checked={sectorAsBar}
                                            onChange={setSectorAsBar}
                                            checkedChildren="Bar"
                                            unCheckedChildren="Pie"
                                            className="bg-gradient-to-r from-blue-500 to-indigo-600"
                                        />
                                    </AntTooltip>
                                </div>
                            }
                            className="!rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                {sectorAsBar ? (
                                    <BarChart data={sectorData}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#E5E7EB"
                                        />
                                        <XAxis dataKey="name" hide />
                                        <YAxis stroke="#6B7280" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: '12px',
                                                boxShadow:
                                                    '0 10px 25px rgba(0,0,0,0.1)',
                                            }}
                                        />
                                        <Bar
                                            dataKey="value"
                                            radius={[8, 8, 0, 0]}
                                        >
                                            {sectorData.map((s, i) => (
                                                <Cell key={i} fill={s.color} />
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
                                            label={({ percent }) =>
                                                `${(
                                                    (percent ?? 0) * 100
                                                ).toFixed(0)}%`
                                            }
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
                                                border: '1px solid #E5E7EB',
                                                borderRadius: '12px',
                                                boxShadow:
                                                    '0 10px 25px rgba(0,0,0,0.1)',
                                            }}
                                        />
                                    </PieChart>
                                )}
                            </ResponsiveContainer>
                            <div className="flex flex-wrap gap-3 mt-6">
                                {sectorData.map((s) => (
                                    <div
                                        key={s.name}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <span
                                            className="inline-block w-3 h-3 rounded-sm"
                                            style={{ background: s.color }}
                                        />
                                        <span className="text-gray-600">
                                            {s.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card
                            title={
                                <span className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                    <RiseOutlined className="text-purple-500" />
                                    Projects by Region
                                </span>
                            }
                            className="!rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={regionData}>
                                    <defs>
                                        <linearGradient
                                            id="regionGradient"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#8B5CF6"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#6366F1"
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#E5E7EB"
                                    />
                                    <XAxis dataKey="region" stroke="#6B7280" />
                                    <YAxis stroke="#6B7280" />
                                    <Tooltip
                                        cursor={{
                                            fill: 'rgba(139, 92, 246, 0.1)',
                                        }}
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '12px',
                                            boxShadow:
                                                '0 10px 25px rgba(0,0,0,0.1)',
                                        }}
                                    />
                                    <Bar
                                        dataKey="developments"
                                        fill="url(#regionGradient)"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>
            </div>
            <InformationRegion />
        </div>
    );
};

export default HomePage;
