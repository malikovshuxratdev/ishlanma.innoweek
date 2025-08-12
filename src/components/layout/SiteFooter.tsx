import React from 'react';
import { Layout as AntLayout, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ExperimentOutlined } from '@ant-design/icons';

const { Footer } = AntLayout;
const { Title } = Typography;

const SiteFooter: React.FC = () => {
    return (
        <Footer className="bg-surface text-center py-6 border-t border-border">
            <div className="container mx-auto px-6 py-8">
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={8}>
                        <div className="text-left">
                            <div className="flex items-center mb-4">
                                <ExperimentOutlined className="text-2xl text-accent mr-2 animate-pulse" />
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Loyiha
                                </span>
                            </div>
                            <div className="text-text-secondary mb-2">
                                Yangi ishlanmalar elektron bazasi axborot
                                tizimi.
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="text-left">
                            <Title level={5} className="mb-4 text-text">
                                Contact Information
                            </Title>
                            <div className="space-y-3 text-text-secondary">
                                <div className="flex items-center hover:text-accent transition-colors duration-200 cursor-pointer">
                                    <span className="mr-2">📧</span>
                                    <span>info@scicommerz.uz</span>
                                </div>
                                <div className="flex items-center hover:text-accent transition-colors duration-200 cursor-pointer">
                                    <span className="mr-2">📞</span>
                                    <span>+998 71 123 45 67</span>
                                </div>
                                <div className="flex items-center hover:text-accent transition-colors duration-200 cursor-pointer">
                                    <span className="mr-2">📍</span>
                                    <span>Tashkent, Uzbekistan</span>
                                </div>
                                <div className="flex items-center hover:text-accent transition-colors duration-200 cursor-pointer">
                                    <span className="mr-2">🌐</span>
                                    <span>www.scicommerz.uz</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="text-left">
                            <Title level={5} className="mb-4 text-text">
                                Quick Links
                            </Title>
                            <div className="space-y-3">
                                <div>
                                    <Link
                                        to="/"
                                        className="text-text-secondary hover:text-accent transition-colors duration-200 flex items-center"
                                    >
                                        <span className="mr-2">🏠</span>Home
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        to="/applications"
                                        className="text-text-secondary hover:text-accent transition-colors duration-200 flex items-center"
                                    >
                                        <span className="mr-2">📋</span>
                                        Applications
                                    </Link>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="text-text-secondary hover:text-accent transition-colors duration-200 flex items-center"
                                    >
                                        <span className="mr-2">ℹ️</span>About Us
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="text-text-secondary hover:text-accent transition-colors duration-200 flex items-center"
                                    >
                                        <span className="mr-2">🆘</span>Support
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Footer>
    );
};

export default SiteFooter;
