export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    // Personal
    phone?: string | null;
    date_of_birth?: string | null;
    gender?: string | null;
    // Billing
    billing_name?: string | null;
    billing_address?: string | null;
    billing_city?: string | null;
    billing_state?: string | null;
    billing_country?: string | null;
    billing_postcode?: string | null;
    // Shipping
    shipping_name?: string | null;
    shipping_address?: string | null;
    shipping_city?: string | null;
    shipping_state?: string | null;
    shipping_country?: string | null;
    shipping_postcode?: string | null;
    // Preferences
    newsletter_subscribed?: boolean;
    marketing_opt_in?: boolean;
    preferred_currency?: string;
    preferred_language?: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
