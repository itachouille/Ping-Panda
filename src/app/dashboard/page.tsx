import DashboardPageLayout from "./_components/DashboardPageLayout"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DasboardPageContent from "./_components/DasboardPageContent"

const DashboardPage = async () => {
  const auth = await currentUser()

  if (!auth) redirect("/sign-up")

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) redirect("/sign-in")

  return (
    <DashboardPageLayout title="Dashboard">
      <DasboardPageContent />
    </DashboardPageLayout>
  )
}

export default DashboardPage
