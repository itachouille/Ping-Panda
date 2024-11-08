import DashboardPageLayout from "./_components/DashboardPageLayout"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DasboardPageContent from "./_components/DasboardPageContent"
import CreateEventCategoryModal from "./_components/CreateEventCategoryModal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { PaymentSuccessModal } from "./_components/PaymentSuccessModal"
import { createCheckoutSession } from "@/lib/stripe"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const DashboardPage = async ({ searchParams }: PageProps) => {
  const auth = await currentUser()

  if (!auth) redirect("/sign-up")

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) redirect("/sign-in")

  const intent = searchParams.intent

  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    })

    if (session.url) redirect(session.url)
  }

  const success = searchParams.success

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}

      <DashboardPageLayout
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="size-4 mr-2" />
              Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        title="Dashboard"
      >
        <DasboardPageContent />
      </DashboardPageLayout>
    </>
  )
}

export default DashboardPage
