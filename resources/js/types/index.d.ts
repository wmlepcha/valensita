export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface MenuItem {
    id: number;
    label: string;
    url: string;
    image_url?: string;
    image_alt?: string;
    children?: MenuItem[];
}

export interface Menu {
    id: number;
    name: string;
    slug: string;
    url?: string;
    title?: string;
    items: MenuItem[];
}

export interface FooterSocialLink {
    platform: string;
    url: string;
    iconName?: string | null;
}

export interface FooterServiceItem {
    text: string;
}

export interface Footer {
    brandName: string;
    description: string;
    logoUrl: string;
    socialLinks: FooterSocialLink[];
    serviceItems: FooterServiceItem[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    menus: Menu[];
    footer: Footer | null;
};
