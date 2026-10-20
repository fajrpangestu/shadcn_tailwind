import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "@/components/ui/button";
import AppModal from "../../components/AppModal";
import api from "@/services/api.js";

const ListTransaction = () => {
  const navigate = useNavigate();
  const _initForm = {
    id: null,
    name: "",
    email: "",
    password: "",
    is_active: 1,
  };

  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchTransaction = async () => {
    try {
      const response = await api.get("/transaction");
      setTransactions(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  };

  const handleEditModal = (user) => {
    console.log(user);
    setShowModal(true);
    setIsEdit(true);
    setFormData(user);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_active: parseInt(formData.is_active),
      }
      if (isEdit) {
        await api.put(`/user/${formData.id}`, payload);
      } else {
        await api.post("/user", payload);
      }
      setFormData(_initForm);
    } catch (error) {
      const errorMsg = error.message;
      console.log(errorMsg);
    } finally {
      fetchTransaction();
      setShowModal(false);
    }
  }

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      await api.delete(`/user/${id}`);
      fetchTransaction();
    }
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Transaction</CardTitle>
          </div>
          <Button variant="outline" onClick={() => navigate("/transaction/create")}>Create New Transaction</Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Order Number</th>
                <th className="px-6 py-3 font-medium">Payment Method</th>
                <th className="px-6 py-3 font-medium">Products</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.length > 0 ? (
                transactions.map((user, index) => (
                  <tr key={index} className="hover:bg-muted/100 transition-colors">
                    <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                    <td>{user.order_number}</td>
                    <td>{user.payment_method === 1 ? "Gopay" : "Cash"}</td>
                    <td>
                      <ul>
                        {user.items.map((item, i) => (
                          <li key={`${user.id}-${i}`}>{item.name}</li>
                        ))}
                      </ul>
                    </td>

                    <td className="px-4 py-6 whitespace-nowrap">
                      <Button onClick={() => handleEditModal(user)} size="sm" className="me-2 bg-yellow-500">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(user.id)} variant="destructive" size="sm" className="me-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    Belum ada Data Transaction
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit User" : "Create New Transaction"} onSubmit={handleSubmit} submitLabel={isEdit ? "Save Change" : "Save"}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={isEdit ? false : true}
              placeholder="Enter your password"
            />
          </div>

          {/* Dropdown Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <select
              name="is_active"
              value={formData.is_active}
              onChange={handleChange}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value={1}>Active</option>
              <option value={0}>In-Active</option>
            </select>
          </div>
        </div>
      </AppModal>
    </>
  );
};

export default ListTransaction;