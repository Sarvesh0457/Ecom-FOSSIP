import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  FiSave,
  FiCamera,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export const Profile = () => {
  const [saving, setSaving] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedPwd, setSavedPwd] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar ||
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "Sarah Connor",
      email: user?.email || "admin@fashion.com",
      phone: "+1 (555) 000-1234",
      role: user?.role || "Administrator",
    },
  });

  const {
    register: regPwd,
    handleSubmit: handlePwd,
    reset: resetPwd,
    formState: { errors: errPwd },
    watch: watchPwd,
  } = useForm();

  const onProfileSubmit = async (data) => {
    setSaving(true);
    if (updateProfile) {
      await updateProfile({ ...data, avatar: avatarUrl });
    }
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const onPasswordSubmit = async (data) => {
    setSavingPwd(true);
    await new Promise((r) => setTimeout(r, 800));
    setSavingPwd(false);
    setSavedPwd(true);
    resetPwd();
    setTimeout(() => setSavedPwd(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your admin account details and security.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 rounded-xl font-semibold text-sm">
          ✓ Profile updated successfully!
        </div>
      )}

      {savedPwd && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 rounded-xl font-semibold text-sm">
          ✓ Password changed successfully!
        </div>
      )}

      {/* Avatar Section */}
      <Card
        title="Profile Photo"
        subtitle="Upload a profile image for your admin account."
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <img
              src={avatarUrl}
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
            />
            <div className="absolute bottom-0 right-0 p-1.5 bg-lime-600 rounded-full text-white shadow-md cursor-pointer hover:bg-lime-700 transition-colors">
              <FiCamera className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Avatar Image URL
            </label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-1 focus:ring-lime-500 text-slate-900 dark:text-slate-100"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Enter an image URL to update your profile picture.
            </p>
          </div>
        </div>
      </Card>

      {/* Profile Details */}
      <Card
        title="Personal Information"
        subtitle="Update your admin name, email, and contact details."
      >
        <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <div className="flex">
                <span className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-500">
                  <FiUser className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="flex-1 px-3 py-2 rounded-r-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-1 focus:ring-lime-500 text-slate-900 dark:text-slate-100"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <div className="flex">
                <span className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-500">
                  <FiMail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="flex-1 px-3 py-2 rounded-r-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-1 focus:ring-lime-500 text-slate-900 dark:text-slate-100"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="flex">
                <span className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-500">
                  <FiPhone className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  {...register("phone")}
                  className="flex-1 px-3 py-2 rounded-r-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-1 focus:ring-lime-500 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Role
              </label>
              <input
                type="text"
                {...register("role")}
                readOnly
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              loading={saving}
              icon={FiSave}
            >
              Save Profile
            </Button>
          </div>
        </form>
      </Card>

      {/* Change Password */}
      <Card
        title="Change Password"
        subtitle="Update your admin login password securely."
      >
        <form onSubmit={handlePwd(onPasswordSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Current Password *
            </label>
            <div className="flex">
              <span className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-500">
                <FiLock className="w-4 h-4" />
              </span>
              <input
                type={showOld ? "text" : "password"}
                {...regPwd("currentPassword", {
                  required: "Current password is required",
                })}
                className="flex-1 px-3 py-2 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none text-slate-900 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-lg text-slate-500 hover:text-slate-700"
              >
                {showOld ? (
                  <FiEyeOff className="w-4 h-4" />
                ) : (
                  <FiEye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errPwd.currentPassword && (
              <p className="text-xs text-rose-500 mt-1">
                {errPwd.currentPassword.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                New Password *
              </label>
              <div className="flex">
                <span className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-500">
                  <FiLock className="w-4 h-4" />
                </span>
                <input
                  type={showNew ? "text" : "password"}
                  {...regPwd("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="flex-1 px-3 py-2 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none text-slate-900 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-lg text-slate-500 hover:text-slate-700"
                >
                  {showNew ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errPwd.newPassword && (
                <p className="text-xs text-rose-500 mt-1">
                  {errPwd.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Confirm Password *
              </label>
              <div className="flex">
                <span className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-500">
                  <FiLock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  {...regPwd("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (v) =>
                      v === watchPwd("newPassword") || "Passwords do not match",
                  })}
                  className="flex-1 px-3 py-2 rounded-r-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-1 focus:ring-lime-500 text-slate-900 dark:text-slate-100"
                />
              </div>
              {errPwd.confirmPassword && (
                <p className="text-xs text-rose-500 mt-1">
                  {errPwd.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              loading={savingPwd}
              icon={FiLock}
            >
              Change Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default Profile;
