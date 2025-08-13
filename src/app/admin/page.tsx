
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminDashboardPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
          <CardDescription>Here's an overview of your platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You can manage orders, users, and sellers from the sidebar.</p>
        </CardContent>
      </Card>
    </div>
  )
}
