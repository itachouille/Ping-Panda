"use client"

import { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Heading from "@/components/Heading"
import { usePathname, useRouter } from "next/navigation"

interface DashboardPageLayoutProps {
  title: string
  children?: ReactNode
  cta?: ReactNode
}

const DashboardPageLayout = ({
  title,
  children,
  cta,
}: DashboardPageLayoutProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const isDashboardPage = pathname === "/dashboard"

  return (
    <section className="flex-1 size-full flex flex-col">
      <div className="p-6 sm:p-8 flex justify-between border-b border-gray-200">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-8">
            {!isDashboardPage && (
              <Button
                className="w-fit bg-white"
                variant="outline"
                onClick={() => router.push("/dashboard")}
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}
            <Heading>{title}</Heading>
          </div>

          {cta ? <div className="w-full">{cta}</div> : null}
        </div>
      </div>

      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
        {children}
      </div>
    </section>
  )
}

export default DashboardPageLayout
