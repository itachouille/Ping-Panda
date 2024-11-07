import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import DashboardPageLayout from "../../_components/DashboardPageLayout"
import CategoryPageContent from "../../_components/CategoryPageContent"

interface PageProps {
  params: {
    name: string | string[] | undefined
  }
}

const CategoryNamePage = async ({ params }: PageProps) => {
  if (typeof params.name !== "string") return notFound()

  const auth = await currentUser()

  if (!auth) return notFound()

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) return notFound()

  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name: params.name,
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  })

  if (!category) return notFound()

  const hasEvents = category._count.events > 0

  return (
    <DashboardPageLayout title={`${category.emoji} ${category.name} events`}>
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardPageLayout>
  )
}

export default CategoryNamePage
