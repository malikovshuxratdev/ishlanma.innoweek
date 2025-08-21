import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Finance } from '../../types/get-application/getByIdApplicationType';

interface FinanceSectionProps {
    finance: Finance;
}

const FinanceSection: React.FC<FinanceSectionProps> = ({ finance }) => {
    const formatCurrency = (amount: string) => {
        const num = parseFloat(amount);
        return new Intl.NumberFormat('uz-UZ', {
            style: 'currency',
            currency: 'UZS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);
    };

    const getValueIcon = (amount: string) => {
        const num = parseFloat(amount);
        if (num > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
        if (num < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
        return <Minus className="w-4 h-4 text-gray-600" />;
    };

    const getValueColor = (amount: string) => {
        const num = parseFloat(amount);
        if (num > 0) return 'text-green-700';
        if (num < 0) return 'text-red-700';
        return 'text-gray-700';
    };

    const financialItems = [
        {
            label: 'Mahsulot (tovar, ish va xizmat) larni sotishdan sof tushum',
            value: finance.net_income,
        },
        {
            label: 'Sotilgan mahsulot (tovar, ish va xizmat) larning tannarxi',
            value: finance.cost_of_goods_sold,
        },
        {
            label: 'Mahsulot (tovar, ish va xizmat) larni sotishning yalpi foydasi (zarari)',
            value: finance.gross_profit_or_loss,
        },
        { label: 'Sotish xarajatlari', value: finance.selling_expenses },
        {
            label: 'Maʼmuriy xarajatlar',
            value: finance.administrative_expenses,
        },
        {
            label: 'Boshqa operatsion xarajatlar',
            value: finance.other_operating_expenses,
        },
        {
            label: 'Asosiy faoliyatning boshqa daromadlari',
            value: finance.other_income,
        },
        {
            label: 'Moliyaviy ijaradan daromadlar',
            value: finance.rental_income,
        },
        {
            label: 'Valyuta kursi farqidan daromadlar',
            value: finance.foreign_exchange_gain,
        },
        {
            label: 'Moliyaviy faoliyatning boshqa daromadlari',
            value: finance.other_financial_income,
        },
        {
            label: 'Valyuta kursi farqidan zararlar',
            value: finance.foreign_exchange_loss,
        },
        {
            label: 'Favquloddagi foyda va zararlar',
            value: finance.extraordinary_profit_or_loss,
        },
        { label: 'Foyda soligʻi', value: finance.income_tax },
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                Ishlanmaning moliyaviy natijalari boʻyicha koʻrsatkichlar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {financialItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-700">
                                {item.label}
                            </h4>
                            {getValueIcon(item.value)}
                        </div>
                        <p
                            className={`text-lg font-semibold ${getValueColor(
                                item.value
                            )}`}
                        >
                            {formatCurrency(item.value)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinanceSection;
