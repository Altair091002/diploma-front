export interface Category
{
    id?: string;
    title?: string;
    slug?: string;
}

export interface Course
{
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    category?: string;
    duration?: number;
    steps?: {
        order?: number;
        title?: string;
        subtitle?: string;
        content?: string;
    }[];
    totalSteps?: number;
    updatedAt?: number;
    featured?: boolean;
    progress?: {
        currentStep?: number;
        completed?: number;
    };
}
export interface Step
{
    order?: number;
    title?: string;
    subtitle?: string;
    content?: string;
}
export interface Progress
{
    currentStep?: number;
    completed?: number;
}
