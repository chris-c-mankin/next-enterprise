import "styles/tailwind.css"
import { Roboto_Mono } from "next/font/google"

const inter = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header className="fixed h-16 w-full bg-zinc-900 border-b border-b-slate-500"></header>
        <section className="h-16"> </section>
        {children}
      </body>
    </html>
  )
}
