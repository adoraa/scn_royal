import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "../../components/ui/dialog";

// Mock users data (replace with actual API calls)
const mockUsers = [
  { id: 1, username: "john_doe", role: "admin" },
  { id: 2, username: "jane_smith", role: "user" },
  { id: 3, username: "mark_jones", role: "user" },
  { id: 4, username: "lisa_taylor", role: "admin" },
];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users (replace this with an API call)
  useEffect(() => {
    setUsers(mockUsers); // Replace with actual fetch request
  }, []);

  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
    // Implement edit logic
  };

  const handleDelete = (userId) => {
    console.log("Delete user:", userId);
    // Implement delete logic
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>Manage Users</CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="border p-2 flex space-x-2">
                    {/* Edit Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(user.id)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        {/* Here you can put the edit form */}
                        <div>Edit User: {user.username}</div>
                      </DialogContent>
                    </Dialog>

                    {/* Delete Button */}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsers;
