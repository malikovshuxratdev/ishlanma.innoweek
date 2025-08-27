export enum ApplicationStatus {
    DRAFT = 0,
    SUBMITTED = 1,
    APPROVED = 2,
    REJECTED = -1,
    RE_EDIT = -2,
}

export const ApplicationStatusLabels: Record<ApplicationStatus, string> = {
    [ApplicationStatus.DRAFT]: 'Loyiha',
    [ApplicationStatus.SUBMITTED]: "Ko'rib chiqilmoqda",
    [ApplicationStatus.APPROVED]: 'Tasdiqlangan',
    [ApplicationStatus.REJECTED]: 'Rad etilgan',
    [ApplicationStatus.RE_EDIT]: 'Qayta tahrir',
};

export const ApplicationStatusColors: Record<ApplicationStatus, string> = {
    [ApplicationStatus.DRAFT]: 'bg-gray-100 text-gray-800 border-gray-300',
    [ApplicationStatus.SUBMITTED]:
        'bg-orange-100 text-orange-800 border-orange-300',
    [ApplicationStatus.APPROVED]:
        'bg-green-100 text-green-800 border-green-300',
    [ApplicationStatus.REJECTED]: 'bg-red-100 text-red-800 border-red-300',
    [ApplicationStatus.RE_EDIT]:
        'bg-yellow-100 text-yellow-800 border-yellow-300',
};

export const ApplicationStatusIcons: Record<ApplicationStatus, string> = {
    [ApplicationStatus.DRAFT]: '📝',
    [ApplicationStatus.SUBMITTED]: '⏳',
    [ApplicationStatus.APPROVED]: '✅',
    [ApplicationStatus.REJECTED]: '❌',
    [ApplicationStatus.RE_EDIT]: '✏️',
};
