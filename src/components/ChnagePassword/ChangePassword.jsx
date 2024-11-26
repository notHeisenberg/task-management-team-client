import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { axiosCommon } from "@/hooks/useAxiosCommon";

const ChangePassword = () => {
  const [hasPassword, setHasPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, passwordUpdate } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  useEffect(() => {
    const fetchUserPasswordStatus = async () => {
      try {
        const response = await axiosCommon.get(
          `/userSearch?email=${user?.email}`
        );
        setHasPassword(response.data.hasPassword || false);
      } catch (error) {
        console.error("Error checking password status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPasswordStatus();
  }, [user?.email]);

  const onSubmit = async (data) => {
    const { newPassword, confirmPassword } = getValues();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axiosCommon.patch("/changePassword", {
        email: user.email,
        currentPassword: data.currentPassword,
        newPassword,
      });
      passwordUpdate(newPassword);
      toast.success("Password updated successfully");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {hasPassword && (
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            {...register("currentPassword", { required: true })}
            className="mt-2"
            placeholder="Enter current password"
          />
          {errors.currentPassword && (
            <p className="text-red-400 mt-1">Current password is required</p>
          )}
        </div>
      )}

      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          {...register("newPassword", {
            required: true,
            minLength: 6,
          })}
          className="mt-2"
          placeholder="Enter new password"
        />
        {errors.newPassword && (
          <p className="text-red-400 mt-1">
            {errors.newPassword.type === "minLength"
              ? "Password must be at least 6 characters"
              : "New password is required"}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", { required: true })}
          className="mt-2"
          placeholder="Confirm new password"
        />
        {errors.confirmPassword && (
          <p className="text-red-400 mt-1">Please confirm your password</p>
        )}
      </div>

      <Button type="submit" className="w-full mt-4">
        Change Password
      </Button>
    </form>
  );
};

export default ChangePassword;