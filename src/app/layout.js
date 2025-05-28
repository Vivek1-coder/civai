import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "./(auth)/AuthContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CivAI",
  description: "Your personalised legal assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         cz-shortcut-listen="true"
      >
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
