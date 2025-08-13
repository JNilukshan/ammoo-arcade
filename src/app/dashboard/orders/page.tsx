
"use client"

import { File, ListFilter, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const orders = [
    {
        order: "ORD001",
        customer: "Liam Johnson",
        email: "liam@example.com",
        type: "Sale",
        status: "Fulfilled",
        date: "2023-06-23",
        amount: "Rs. 250.00"
    },
    {
        order: "ORD002",
        customer: "Olivia Smith",
        email: "olivia@example.com",
        type: "Refund",
        status: "Declined",
        date: "2023-06-24",
        amount: "Rs. 150.00"
    },
    {
        order: "ORD003",
        customer: "Noah Williams",
        email: "noah@example.com",
        type: "Subscription",
        status: "Fulfilled",
        date: "2023-06-25",
        amount: "Rs. 350.00"
    },
     {
        order: "ORD004",
        customer: "Emma Brown",
        email: "emma@example.com",
        type: "Sale",
        status: "Fulfilled",
        date: "2023-06-26",
        amount: "Rs. 450.00"
    },
     {
        order: "ORD005",
        customer: "James Jones",
        email: "james@example.com",
        type: "Sale",
        status: "Pending",
        date: "2023-06-26",
        amount: "Rs. 550.00"
    }
]

export default function DashboardOrdersPage() {
  return (
    <Tabs defaultValue="week">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 text-sm"
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Fulfilled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Declined
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Refunded
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1 text-sm"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>
       <Card className="mt-4">
        <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>
            Recent orders from your store.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">
                    Type
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                    Status
                </TableHead>
                <TableHead className="hidden md:table-cell">
                    Date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(order => (
                    <TableRow key={order.order}>
                        <TableCell>
                            <div className="font-medium">{order.customer}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                            {order.email}
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                            {order.type}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant={order.status === 'Fulfilled' ? "default" : "secondary"}>
                             {order.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {order.date}
                        </TableCell>
                        <TableCell className="text-right">{order.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    </Tabs>
  )
}
