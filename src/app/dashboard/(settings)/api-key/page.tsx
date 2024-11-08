import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardPageLayout from "../../_components/DashboardPageLayout"
import { ApiKeySettings } from "./ApiKeySettings"

const Page = async () => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <DashboardPageLayout title="API Key">
      <ApiKeySettings apiKey={user.apiKey ?? ""} />
    </DashboardPageLayout>
  )
}

export default Page
