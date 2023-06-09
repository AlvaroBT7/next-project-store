import UsersDataProvider from "../contexts/UsersData";
import Nav from "../components/Nav";
import "./globals.css";

export const metadata = {
  title: "PAN store",
  description: "PAN store metadata description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UsersDataProvider>
        <body>
          <Nav />
          {children}
        </body>
      </UsersDataProvider>
    </html>
  );
}
