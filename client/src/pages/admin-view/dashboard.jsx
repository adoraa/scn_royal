import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "../../components/ui/table";

// Mock data (replace with actual API calls)
const mockRevenueData = [
  { date: "2025-01-01", revenue: 1000 },
  { date: "2025-01-02", revenue: 1500 },
  { date: "2025-01-03", revenue: 2000 },
  { date: "2025-01-04", revenue: 1800 },
  { date: "2025-01-05", revenue: 2200 },
];

const mockOrders = [
  { id: 1, amount: 250 },
  { id: 2, amount: 400 },
  { id: 3, amount: 180 },
  { id: 4, amount: 320 },
  { id: 5, amount: 500 },
  { id: 6, amount: 150 },
  { id: 7, amount: 700 },
  { id: 8, amount: 430 },
  { id: 9, amount: 900 },
  { id: 10, amount: 350 },
];

function AdminDashboard() {
  const [totalRevenue, setTotalRevenue] = useState(15000);
  const [totalSales, setTotalSales] = useState(300);
  const [totalProducts, setTotalProducts] = useState(120);
  const [totalUsers, setTotalUsers] = useState(500);
  const [revenueData, setRevenueData] = useState(mockRevenueData);
  const [recentOrders, setRecentOrders] = useState(mockOrders);

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid-cols-1 gap-6 md:grid-cols-4">
        {/* Total Revenue */}
        <Card>
          <CardHeader>Total Revenue</CardHeader>
          <CardContent>${totalRevenue}</CardContent>
        </Card>
        {/* Total Sales */}
        <Card>
          <CardHeader>Total Sales</CardHeader>
          <CardContent>{totalSales}</CardContent>
        </Card>
        {/* Total Products */}
        <Card>
          <CardHeader>Total Products</CardHeader>
          <CardContent>{totalProducts}</CardContent>
        </Card>
        {/* Total Users */}
        <Card>
          <CardHeader>Total Users</CardHeader>
          <CardContent>{totalUsers}</CardContent>
        </Card>
      </div>

      {/* Revenue Chart and Recent Orders */}
      <div className="grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        {/* Line Graph for Revenue */}
        <Card>
          <CardHeader>Revenue Over Time</CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>Recent Orders</CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.slice(0, 10).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>+${order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
