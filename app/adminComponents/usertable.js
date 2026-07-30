export default function UsersTable({ users, fetchFailed }) {
  if (fetchFailed || !Array.isArray(users)) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5 mt-8 text-red-600 font-medium">
        fetch failed
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Recent Users</h2>

        <p className="text-sm text-gray-500">Showing latest 5 users</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3">Name</th>

              <th className="text-left p-3">Email</th>

              <th className="text-left p-3">Role</th>

              <th className="text-left p-3">Joined</th>
            </tr>
          </thead>

          <tbody>
            {users
              .slice()
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 5)
              .map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>

                  <td className="p-3">{user.email}</td>

                  <td className="p-3 capitalize">{user.role}</td>

                  <td className="p-3">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
