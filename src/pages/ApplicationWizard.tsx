import React, { useState } from 'react';
import Step1InnovationDetails from './application-steps/Step1InnovationDetails';
import Step2IntellectualProperty from './application-steps/Step2IntellectualProperty';
import Step3ScientificBackground from './application-steps/Step3ScientificBackground';
import Step4AdditionalInfo from './application-steps/Step4AdditionalInfo';
import Step5FinancialPerformance from './application-steps/Step5FinancialPerformance';

const ApplicationWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<any>({});

    const handleNext = (stepData: any) => {
        setFormData((prev) => ({ ...prev, ...stepData }));
        setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1InnovationDetails
                        onNext={handleNext}
                        initialValues={formData}
                    />
                );
            case 2:
                return (
                    <Step2IntellectualProperty
                        onNext={handleNext}
                        onBack={handleBack}
                        initialValues={formData}
                    />
                );
            case 3:
                return (
                    <Step3ScientificBackground
                        onNext={handleNext}
                        onBack={handleBack}
                        initialValues={formData}
                    />
                );
            case 4:
                return (
                    <Step4AdditionalInfo
                        onNext={handleNext}
                        onBack={handleBack}
                        initialValues={formData}
                    />
                );
            case 5:
                return (
                    <Step5FinancialPerformance
                        onBack={handleBack}
                        initialValues={formData}
                        allFormData={formData}
                    />
                );
            default:
                return null;
        }
    };

    return <div>{renderStep()}</div>;
};

export default ApplicationWizard;
