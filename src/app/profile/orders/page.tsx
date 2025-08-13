
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const orders = [
    {
        order: "ORD001",
        status: "Fulfilled",
        date: "2023-06-23",
        amount: "Rs. 250.00"
    },
    {
        order: "ORD002",
        status: "Pending",
        date: "2023-06-24",
        amount: "Rs. 150.00"
    },
    {
        order: "ORD003",
        status: "Fulfilled",
        date: "2023-06-25",
        amount: "Rs. 350.00"
    },
]

export default function ProfileOrdersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders and their status.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.order}>
                                <TableCell className="font-medium">{order.order}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                     <Badge variant={order.status === 'Fulfilled' ? "default" : "secondary"}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">{order.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
