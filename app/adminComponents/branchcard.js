"use client";

import { useState } from "react";

export default function BranchCard({ branch, orders, fetchFailed }) {
    const [showStock, setShowStock] = useState(false);

    if (fetchFailed) {
        return (
            <div className="bg-white rounded-xl shadow-md p-5">
                Failed to fetch data.
            </div>
        );
    }

    const totalMedicines = branch.stock.length;

    const lowStock = branch.stock.filter(
        medicine => medicine.stock_status === "Low Stock"
    ).length;

    const outOfStock = branch.stock.filter(
        medicine => medicine.stock_status === "Out of Stock"
    ).length;

    const totalOrders = orders.filter(
        order => order.branch_name === branch.name
    ).length;

    const pendingOrders = orders.filter(
        order =>
            order.branch_name === branch.name &&
            order.verification_status === "Pending"
    ).length;

    return (
        <div className="bg-white rounded-xl shadow-md p-5">

            <h2 className="text-xl font-semibold">
                {branch.name}
            </h2>

            <p className="text-gray-500 mb-4">
                {branch.location}
            </p>

            <div className="space-y-2">

                <p>
                    <span className="font-medium">Medicines:</span> {totalMedicines}
                </p>

                <p>
                    <span className="font-medium">Low Stock:</span> {lowStock}
                </p>

                <p>
                    <span className="font-medium">Out of Stock:</span> {outOfStock}
                </p>

                <p>
                    <span className="font-medium">Orders:</span> {totalOrders}
                </p>

                <p>
                    <span className="font-medium">Pending Verification:</span> {pendingOrders}
                </p>

            </div>

            <button
                onClick={() => setShowStock(!showStock)}
                className="mt-5 text-blue-600 font-medium"
            >
                {showStock ? "Hide Stock" : "View Stock"}
            </button>

            {showStock && (
                <div className="mt-5 overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>
                            <tr className="border-b">
                                <th className="py-2">Medicine</th>
                                <th className="py-2">Quantity</th>
                                <th className="py-2">Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {branch.stock.map(medicine => (
                                <tr
                                    key={medicine.medicine_id}
                                    className="border-b"
                                >
                                    <td className="py-2">
                                        {medicine.medicine_name}
                                    </td>

                                    <td className="py-2">
                                        {medicine.quantity_available}
                                    </td>

                                    <td className="py-2">
                                        {medicine.stock_status}
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}