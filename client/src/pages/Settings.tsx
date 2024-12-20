import "../styles/settings.css";
import { useState } from "react";
import { deleteUser } from "@/services/deleteUser";
import auth from "@/utils/auth";
const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteAccount = async () => {
    if (auth.loggedIn()) {
      const profile = auth.getProfile();

      if (profile) {
        const userId = profile.id;
        await deleteUser(userId);
        localStorage.removeItem("id_token");
        window.location.reload();
      }
    } else {
      console.error("User is not logged in");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="mq-settings min-h-screen flex items-center justify-center bg-[#F3F4F6] py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-lg w-full space-y-12">
        <h2 className="text-center text-4xl font-bold text-gray-800">
          Account Settings
        </h2>
        <div className="space-y-6">
          <p className="text-center text-lg text-gray-700">
            If you would like to delete your account, please be aware that this
            action is permanent and cannot be undone.
          </p>
          <button
            onClick={toggleModal}
            className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Delete My Account
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full space-y-4">
            <h3 className="text-lg font-medium text-gray-800">
              Are you sure you want to delete your account?
            </h3>
            <p className="text-gray-600 text-sm">
              This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleModal}
                className="py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
