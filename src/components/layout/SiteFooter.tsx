import React from 'react';
import { Layout as AntLayout, Row, Col, Typography } from 'antd';
import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Sparkles,
    ExternalLink,
} from 'lucide-react';
import logoImage from '../../assets/images/Logo.svg';

const { Footer } = AntLayout;
const { Title } = Typography;

const SiteFooter: React.FC = () => {
    return (
        <Footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-8">
                <Row gutter={[24, 24]} align="middle">
                    {/* Brand Section */}
                    <Col xs={24} md={10}>
                        <div className="text-left">
                            <div className="mb-4">
                                <img
                                    src={logoImage}
                                    alt="Ishlanma logo"
                                    aria-label="Ishlanma logo"
                                    className="w-auto h-8 max-w-[160px]"
                                />
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Yangi ishlanmalar elektron bazasi axborot
                                tizimi. Innovatsiyalar va ilmiy ishlanmalarni
                                rivojlantirish uchun zamonaviy platforma.
                            </p>
                        </div>
                    </Col>

                    {/* Contact Section */}
                    <Col xs={24} md={8}>
                        <div className="text-left">
                            <Title
                                level={5}
                                className="!text-white !mb-4 flex items-center gap-2 text-base"
                            >
                                <Sparkles className="w-4 h-4 text-blue-400" />
                                Aloqa ma'lumotlari
                            </Title>
                            <div className="space-y-2 grid grid-cols-2 gap-2">
                                {[
                                    {
                                        icon: Mail,
                                        text: 'info@scicommerz.uz',
                                        color: 'text-blue-400',
                                        link: 'mailto:info@scicommerz.uz',
                                    },
                                    {
                                        icon: Phone,
                                        text: '+998 71 123 45 67',
                                        color: 'text-green-400',
                                        link: 'tel:+998711234567',
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
                                        link: 'https://www.scicommerz.uz',
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`group flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-all duration-200 ${
                                            item.link ? 'cursor-pointer' : ''
                                        }`}
                                        onClick={() =>
                                            item.link &&
                                            window.open(item.link, '_blank')
                                        }
                                    >
                                        <div
                                            className={`p-1.5 rounded-md bg-white/10 ${item.color}`}
                                        >
                                            <item.icon className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-slate-300 text-sm group-hover:text-white transition-colors duration-200 flex-1">
                                            {item.text}
                                        </span>
                                        {item.link && (
                                            <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-6 pt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-slate-400 text-xs">
                            © 2025 Ishlanma. Barcha huquqlar himoyalangan.
                        </div>
                        <div className="flex gap-4">
                            {[
                                { icon: '📧', label: 'Email' },
                                { icon: '📱', label: 'Telegram' },
                                { icon: '🌐', label: 'Website' },
                            ].map((social, index) => (
                                <div
                                    key={index}
                                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer"
                                    title={social.label}
                                >
                                    <span className="text-sm">
                                        {social.icon}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Footer>
    );
};

export default SiteFooter;
