import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_Components/navbar/page";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./_Context/authcontext/page";
import Head from "next/head";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  
});

const cairo = localFont({
  src: "./fonts/Cairo-VariableFont_slnt,wght.ttf",
  variable: "--font-cairo",
  weight: "100 900",
  
});

export const metadata = { 
  title: "MarketGo",
  description: "This is my website description",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased`}
      >
        <AuthContextProvider>
          <Navbar />

          {children}

          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: "black",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "#FF334B",
                  color:"#fff"
                },
              },
            }}
          />
        </AuthContextProvider>
      </body>
    </html>
  );
}
