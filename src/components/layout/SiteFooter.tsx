import React from 'react';
import { Layout as AntLayout, Row, Col, Typography } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';
import { Mail, Phone, MapPin, Globe, Sparkles } from 'lucide-react';

const { Footer } = AntLayout;
const { Title } = Typography;

const SiteFooter: React.FC = () => {
    return (
        <Footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl animate-pulse-slow animation-delay-4000"></div>

                {/* Floating particles */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 bg-white/20 rounded-full animate-float-${
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

            <div className="relative z-10 container mx-auto px-6 py-12">
                <Row gutter={[32, 32]}>
                    {/* Brand Section */}
                    <Col xs={24} md={12}>
                        <div className="text-left animate-fade-in-up">
                            <div className="flex items-center mb-6 group">
                                <div className="relative">
                                    <ExperimentOutlined className="text-3xl text-blue-400 mr-3 group-hover:text-cyan-400 transition-colors duration-300" />
                                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:bg-cyan-400/30 transition-all duration-300"></div>
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                    Ishlanma
                                </span>
                            </div>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                Yangi ishlanmalar elektron bazasi axborot
                                tizimi. Innovatsiyalar va ilmiy ishlanmalarni
                                rivojlantirish uchun zamonaviy platforma.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-4">
                                {[
                                    { icon: '📧', label: 'Email' },
                                    { icon: '📱', label: 'Telegram' },
                                    { icon: '🌐', label: 'Website' },
                                    { icon: '📞', label: 'Phone' },
                                ].map((social, index) => (
                                    <div
                                        key={index}
                                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer group"
                                    >
                                        <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                                            {social.icon}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div className="text-left animate-fade-in-up animation-delay-500">
                            <Title
                                level={4}
                                className="!text-white !mb-6 flex items-center gap-2"
                            >
                                <Sparkles className="w-5 h-5 text-blue-400" />
                                Aloqa ma'lumotlari
                            </Title>
                            <div className="space-y-2">
                                {[
                                    {
                                        icon: Mail,
                                        text: 'info@scicommerz.uz',
                                        color: 'text-blue-400',
                                    },
                                    {
                                        icon: Phone,
                                        text: '+998 71 123 45 67',
                                        color: 'text-green-400',
                                    },
                                    {
                                        icon: MapPin,
                                        text: 'Tashkent, Uzbekistan',
                                        color: 'text-red-400',
                                    },
                                    {
                                        icon: Globe,
                                        text: 'www.scicommerz.uz',
                                        color: 'text-purple-400',
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
                                    >
                                        <div
                                            className={`p-2 rounded-lg bg-white/10 ${item.color} group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
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
                .animation-delay-1000 { animation-delay: 1.0s; }
                .animation-delay-1500 { animation-delay: 1.5s; }
                .animation-delay-2000 { animation-delay: 2.0s; }
                .animation-delay-4000 { animation-delay: 4.0s; }

                /* Ensure animations start hidden */
                .animate-fade-in-up {
                    opacity: 0;
                }
            `}</style>
        </Footer>
    );
};

export default SiteFooter;
