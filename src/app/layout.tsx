import Script from "next/script";
import { ThemeProvider } from "./context/ThemeContext";
import FloatingControls from "./components/FloatingControls";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.style.colorScheme = theme;
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <FloatingControls />
        </ThemeProvider>
      </body>
    </html>
  );
}
