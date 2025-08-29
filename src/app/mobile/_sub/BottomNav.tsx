import { Inbox, Info, Pill } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const TabButton = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center p-2 rounded-lg transition
        ${
          active
            ? "bg-blue-100 text-blue-600"
            : "text-gray-500 hover:bg-gray-100"
        }
      `}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
};

export const BottomNav = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="grid grid-cols-3 border-t bg-gray-50 p-2">
      <TabButton
        icon={<Info size={24} />}
        label="Info"
        active={activeTab === "info"}
        onClick={() => setActiveTab("info")}
      />
      <TabButton
        icon={<Pill size={24} />}
        label="Medications"
        active={activeTab === "medications"}
        onClick={() => setActiveTab("medications")}
      />
      <TabButton
        icon={<Inbox size={24} />}
        label="Inbox"
        active={activeTab === "inbox"}
        onClick={() => setActiveTab("inbox")}
      />
    </div>
  );
};
