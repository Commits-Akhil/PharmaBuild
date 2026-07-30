export default function OrdersTable({ orders, fetchFailed }) {
  if (fetchFailed) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5 mt-8">
        Failed to fetch data.
      </div>
    );
  }

  const recentOrders = orders
    .slice()
    .sort((a, b) => b.order_id - a.order_id)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Recent Orders</h2>

        <p className="text-sm text-gray-500">Showing latest 5 orders</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3">Order ID</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Branch</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Verification</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.order_id} className="border-b hover:bg-gray-50">
                <td className="p-3">#{order.order_id}</td>

                <td className="p-3">{order.customer_name}</td>

                <td className="p-3">{order.branch_name}</td>

                <td className="p-3">{order.status}</td>

                <td className="p-3">{order.verification_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
