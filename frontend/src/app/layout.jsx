import "./globals.css";

import { Exo_2 } from "next/font/google";
import NotificationBanner from "@/components/notificationAlerts/notificationBanner";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-exo2",
});

export const metadata = {
  title: "HabitFlow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={exo2.variable}>
      <body>
        <main className="app-content">
          <NotificationBanner />
          {children}
        </main>
      </body>
    </html>
  );
}
