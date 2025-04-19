export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <head>
          <title>Spencer’s Site</title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>{`html, body { margin: 0; padding: 0; height: 100%; }`}</style>
        </head>
        <body style={{ fontFamily: 'sans-serif', height: '100%', width: '100%' }}>
          {children}
        </body>
      </html>
    );
  }
  