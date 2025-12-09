import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import localFont from "next/font/local";

const alliance = localFont({
    src: [
        { path: "../../assets/fonts/Alliance/Alliance-Regular.otf", weight: "400", style: "normal" },
        { path: "../../assets/fonts/Alliance/Alliance-Bold.otf", weight: "700", style: "normal" },
        { path: "../../assets/fonts/Alliance/Alliance-Medium.otf", weight: "500", style: "normal" },
        { path: "../../assets/fonts/Alliance/Alliance-Light.otf", weight: "100", style: "normal" },
        { path: "../../assets/fonts/Alliance/Alliance-Black.otf", weight: "900", style: "normal" },
        { path: "../../assets/fonts/Alliance/Alliance-Medium-Italic.otf", weight: "500", style: "italic" }
    ],
    variable: "--font-alliance",
    display: "swap",
});

const locales = ['en', 'id'];

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!locales.includes(locale)) notFound();

    const messages = await getMessages({ locale });

    return (
        <html lang={locale}>
            <body className={alliance.variable}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <main role="main">
                        {children}
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
