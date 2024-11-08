import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardPageLayout from "../../_components/DashboardPageLayout"
import UpgradePageContent from "./UpgradePageContent"

const UpgradePage = async () => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    redirect("/sign-up")
  }

  return (
    <DashboardPageLayout title="Pro Membership">
      <UpgradePageContent plan={user.plan} />
    </DashboardPageLayout>
  )
}

export default UpgradePage
