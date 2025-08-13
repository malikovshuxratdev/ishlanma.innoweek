import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Switch, Tooltip as AntTooltip } from 'antd';
import { GlobalOutlined, RiseOutlined } from '@ant-design/icons';
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
import heroBg from '../assets/images/bgImage.webp';

const HomePage: React.FC = () => {
    // Sector (pie/bar) data
    const sectorData = [
        { name: 'Information Technology', value: 320, color: '#3B82F6' },
        { name: 'Biotechnology', value: 245, color: '#10B981' },
        { name: 'Energy & Environment', value: 180, color: '#F59E0B' },
        { name: 'Medicine & Healthcare', value: 156, color: '#EF4444' },
        { name: 'Agriculture', value: 89, color: '#8B5CF6' },
        { name: 'Manufacturing', value: 67, color: '#06B6D4' },
    ];
    // Region bar data
    const regionData = [
        { region: 'Tashkent', developments: 456 },
        { region: 'Samarkand', developments: 234 },
        { region: 'Bukhara', developments: 189 },
        { region: 'Fergana', developments: 167 },
        { region: 'Andijan', developments: 134 },
        { region: 'Namangan', developments: 98 },
    ];
    // Chart type toggle
    const [sectorAsBar, setSectorAsBar] = useState(false);

    // Hide scrollbar during initial entrance animation to avoid flicker
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const handleAnimationEnd = useCallback(() => {
        // Restore scrolling after animation completes
        document.body.style.overflow = '';
    }, []);

    return (
        <div className="animate-fade-in" onAnimationEnd={handleAnimationEnd}>
            {/* === Gentle Hero Section === */}
            <section
                aria-labelledby="hero-heading"
                className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
            >
                {/* Background */}
                <div className="absolute inset-0 z-10">
                    <img
                        src={heroBg}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Wrapper */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1
                            id="hero-heading"
                            className="font-semibold tracking-tight mt-10 sm:mt-0 text-2xl sm:text-4xl lg:text-6xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,5)]"
                        >
                            Yangi ishlanmalar elektron bazasi <br /> axborot
                            tizimi
                        </h1>
                        <p className="mt-6 text-sm sm:text-xl text-slate-300 leading-relaxed font-medium shadow-md">
                            Innovatsion g‘oyalar va ilmiy ishlanmalaringizni
                            yagona platformada jamlang. Ariza topshiring,
                            jarayonni kuzating va natijalarni tahlil qiling.
                        </p>

                        {/* Stats */}
                        <div
                            className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
                            aria-label="platform statistics"
                        >
                            {[
                                {
                                    label: 'Kelib tushgan arizalar',
                                    value: 1200,
                                },
                                {
                                    label: 'Moderatsiyadagi arizalar',
                                    value: 450,
                                },
                                { label: 'Qabul qilingan', value: 89 },
                                {
                                    label: 'Sohalar bo‘yicha ishlanmalar',
                                    value: 67,
                                },
                                {
                                    label: 'Hududlar bo‘yicha ishlanmalar',
                                    value: 67,
                                },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200/70 hover:ring-indigo-300 transition-all p-4 flex flex-col items-center shadow-sm hover:shadow-md"
                                >
                                    <div className="text-2xl font-semibold text-slate-800 tracking-tight">
                                        {s.value}
                                        <span className="text-indigo-500">
                                            +
                                        </span>
                                    </div>
                                    <div className="mt-1 text-[11px] sm:text-xs font-medium text-slate-600 text-center leading-snug">
                                        {s.label}
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div id="stats" className="container mx-auto px-6 py-20">
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
