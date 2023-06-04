import CurrentUserAccountIdProvider from "../contexts/CurrentUserAccountId";
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
    <html lang="es">
      <UsersDataProvider>
        <CurrentUserAccountIdProvider>
          <body>
            <Nav />
            {children}
          </body>
        </CurrentUserAccountIdProvider>
      </UsersDataProvider>
    </html>
  );
}
