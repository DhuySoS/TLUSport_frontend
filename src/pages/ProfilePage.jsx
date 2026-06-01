import ProfileContent from "@/components/profile/profileContent";
import ProfileSidebar from "@/components/profile/profileSidebar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab || "account-settings");

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  return (
    <div className="bg-neutral-100 px-4 py-6 md:px-8 lg:px-15 lg:py-20 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-15">
        <div className="w-full lg:basis-1/4">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex-1 min-w-0">
          <ProfileContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
