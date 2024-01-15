import "styles/tailwind.css"
import { Roboto_Mono } from "next/font/google"
import { PageHeader } from "../components/PageHeader/PageHeader"
import { ReactQueryClientProvider } from "../components/ReactQueryClientProvider/ReactQueryClientProvider"

const inter = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" className={inter.className}>
        <body>
          <header className="fixed top-0 z-50 h-16 w-full border-b border-b-slate-500 bg-zinc-900">
            <PageHeader />
          </header>
          <section className="pt-16"> {children}</section>
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}
