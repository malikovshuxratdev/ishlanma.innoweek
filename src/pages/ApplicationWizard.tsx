import React, { useEffect, useState } from 'react';
import Step1InnovationDetails from './application-steps/Step1InnovationDetails';
import Step2IntellectualProperty from './application-steps/Step2IntellectualProperty';
import Step3ScientificBackground from './application-steps/Step3ScientificBackground';
import Step4AdditionalInfo from './application-steps/Step4AdditionalInfo';
import Step5FinancialPerformance from './application-steps/Step5FinancialPerformance';

const STEPS: { id: number; label: string }[] = [
    { id: 1, label: 'Innovatsion ma’lumotlar' },
    { id: 2, label: 'Intellektual mulk' },
    { id: 3, label: 'Ilmiy faoliyat' },
    { id: 4, label: 'Qo‘shimcha ma’lumot' },
    { id: 5, label: 'Moliyaviy ko‘rsatkichlar' },
];

const STEP_STORAGE_KEY = 'applicationWizardStep';

const ApplicationWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    // Broad index signature; TODO: replace with concrete form schema interface
    type ApplicationFormData = Record<string, unknown>;
    const [formData, setFormData] = useState<ApplicationFormData>({});

    // Load persisted step on mount & set page title
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = Number(localStorage.getItem(STEP_STORAGE_KEY));
            if (saved && saved >= 1 && saved <= STEPS.length) {
                setCurrentStep(saved);
            }
            document.title = 'Ariza topshirish';
        }
    }, []);

    // Persist current step
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STEP_STORAGE_KEY, String(currentStep));
        }
    }, [currentStep]);

    const handleNext = () => {
        setFormData((prev) => ({ ...prev }));
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

    const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;
    const currentStepObj = STEPS.find((s) => s.id === currentStep);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <h1 className="text-2xl font-semibold mb-4 sm:mb-6">
                Ariza topshirish
            </h1>
            {/* Step Indicator (progress bar + steps) */}
            <div className="mb-6 sm:mb-8">
                {/* Mobile compact header */}
                <div className="sm:hidden flex items-center justify-between mb-3">
                    <div className="text-sm font-medium text-gray-800">
                        {currentStep}. {currentStepObj?.label}
                    </div>
                    <div className="text-xs text-gray-500">
                        {currentStep}/{STEPS.length}
                    </div>
                </div>
                <div className="relative mb-4 h-1 bg-gray-200 rounded overflow-hidden">
                    <div
                        className="absolute left-0 top-0 h-1 bg-blue-600 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                        aria-hidden="true"
                    />
                </div>
                {/* Mobile horizontal scroll steps */}
                <div className="sm:hidden -mx-4 px-4 overflow-x-auto pb-2 scrollbar-thin">
                    <div className="flex gap-3 min-w-max">
                        {STEPS.map((step) => {
                            const isActive = step.id === currentStep;
                            const isCompleted = step.id < currentStep;
                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    aria-current={isActive ? 'step' : undefined}
                                    onClick={() => {
                                        if (isCompleted)
                                            setCurrentStep(step.id);
                                    }}
                                    disabled={!isCompleted && !isActive}
                                    className={[
                                        'shrink-0 flex flex-col items-center text-center focus:outline-none',
                                        !isActive && !isCompleted
                                            ? 'opacity-70'
                                            : '',
                                    ].join(' ')}
                                >
                                    <span
                                        className={[
                                            'w-8 h-8 flex items-center justify-center rounded-full border text-xs font-medium mb-1 transition-colors',
                                            isActive
                                                ? 'bg-blue-600 text-white border-blue-600 shadow'
                                                : '',
                                            isCompleted && !isActive
                                                ? 'bg-green-500 border-green-500 text-white'
                                                : '',
                                            !isCompleted && !isActive
                                                ? 'bg-white border-gray-300 text-gray-500'
                                                : '',
                                        ].join(' ')}
                                    >
                                        {isCompleted && !isActive
                                            ? '✓'
                                            : step.id}
                                    </span>
                                    <span className="text-[10px] leading-tight font-medium text-gray-600 max-w-[70px] truncate">
                                        {step.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                {/* Desktop grid steps */}
                <ol
                    className="hidden sm:grid gap-2 sm:gap-4"
                    style={{
                        gridTemplateColumns: `repeat(${STEPS.length}, minmax(0,1fr))`,
                    }}
                >
                    {STEPS.map((step) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;
                        return (
                            <li
                                key={step.id}
                                className="flex flex-col items-center text-center group"
                            >
                                <button
                                    type="button"
                                    aria-current={isActive ? 'step' : undefined}
                                    disabled={!isCompleted && !isActive}
                                    onClick={() => {
                                        if (isCompleted)
                                            setCurrentStep(step.id);
                                    }}
                                    className={[
                                        'w-9 h-9 flex items-center justify-center rounded-full border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500',
                                        isActive
                                            ? 'bg-blue-600 text-white border-blue-600 shadow'
                                            : '',
                                        isCompleted && !isActive
                                            ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
                                            : '',
                                        !isCompleted && !isActive
                                            ? 'bg-white border-gray-300 text-gray-500'
                                            : '',
                                    ].join(' ')}
                                >
                                    {isCompleted && !isActive ? '✓' : step.id}
                                </button>
                                <span
                                    className={[
                                        'mt-2 text-xs sm:text-[13px] leading-tight font-medium',
                                        isActive
                                            ? 'text-blue-700'
                                            : isCompleted
                                            ? 'text-green-600'
                                            : 'text-gray-500',
                                    ].join(' ')}
                                >
                                    {step.label}
                                </span>
                            </li>
                        );
                    })}
                </ol>
            </div>
            <div className="bg-white rounded-lg shadow">{renderStep()}</div>
        </div>
    );
};

export default ApplicationWizard;
