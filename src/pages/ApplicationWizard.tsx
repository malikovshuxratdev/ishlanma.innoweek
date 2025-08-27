import React, { useEffect, useState } from 'react';
import { Steps, Button, Card, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Step1InnovationDetails from './application-steps/Step1InnovationDetails';
import Step2IntellectualProperty from './application-steps/Step2IntellectualProperty';
import Step3ScientificBackground from './application-steps/Step3ScientificBackground';
import Step4AdditionalInfo from './application-steps/Step4AdditionalInfo';
import Step5FinancialPerformance from './application-steps/Step5FinancialPerformance';
import { TokenService } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const STEPS: { id: number; label: string }[] = [
    { id: 1, label: "Ishlanmalar to'g'risida ma'lumot" },
    { id: 2, label: 'Intellektual mulk huquqi' },
    {
        id: 3,
        label: 'Ishlanma yaratilishi uchun avval bajarilgan ilmiy-tadqiqot loyihasi',
    },
    { id: 4, label: "Qo'shimcha ma'lumot" },
    { id: 5, label: "Moliyaviy ko'rsatkichlar" },
];

const ApplicationWizard: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<number>(
        TokenService.getApplicationStep()
            ? Number(TokenService.getApplicationStep())
            : 1
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = Number(TokenService.getApplicationStep());
            if (saved && saved >= 1 && saved <= STEPS.length) {
                setCurrentStep(saved);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            TokenService.setApplicationStep(String(currentStep));
        }
    }, [currentStep]);

    const handleNext = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1InnovationDetails onNext={handleNext} />;
            case 2:
                return (
                    <Step2IntellectualProperty
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case 3:
                return (
                    <Step3ScientificBackground
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case 4:
                return (
                    <Step4AdditionalInfo
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case 5:
                return <Step5FinancialPerformance onBack={handleBack} />;
            default:
                return null;
        }
    };

    const antSteps = STEPS.map((step, index) => ({
        title: step.label,
        status: (index + 1 < currentStep
            ? 'finish'
            : index + 1 === currentStep
            ? 'process'
            : 'wait') as 'finish' | 'process' | 'wait',
    }));

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <Title level={2} className="mb-2">
                        Ariza topshirish
                    </Title>
                </div>

                {/* Steps Section */}
                <Card className="mb-6" size="small">
                    <Steps
                        current={currentStep - 1}
                        size="small"
                        progressDot
                        items={antSteps}
                        onChange={(current) => {
                            if (current + 1 <= currentStep) {
                                setCurrentStep(current + 1);
                            }
                        }}
                    />
                </Card>

                <div className="mb-4">
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={handleBack}
                        size="large"
                        className="shadow-sm"
                    >
                        Ortga qaytish
                    </Button>
                </div>

                {/* Step Content */}
                <Card className="shadow-sm overflow-visible scrollbar-hide">
                    {renderStep()}
                </Card>
            </div>
        </div>
    );
};

export default ApplicationWizard;
