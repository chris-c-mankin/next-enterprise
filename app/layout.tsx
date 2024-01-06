import "styles/tailwind.css"
import { Roboto_Mono } from "next/font/google"
import { PageHeader } from "../components/PageHeader/PageHeader"

const inter = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header className="z-50 fixed top-0 h-16 w-full border-b border-b-slate-500 bg-zinc-900">
          <PageHeader />
        </header>
        <section className="pt-16"> {children}</section>
      </body>
    </html>
  )
}
