import "./globals.css";

export const metadata = {
  title: "How Revolutionary Is Your Club?",
  description: "Powered by The Trabzon Revolution Index (TRI)"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}