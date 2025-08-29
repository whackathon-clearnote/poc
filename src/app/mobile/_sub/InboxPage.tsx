const InboxCard = ({
  title,
  content,
  date,
}: {
  title: string;
  content: string;
  date: string;
}) => {
  return (
    <div className="border rounded-xl p-3 shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
        {content}
      </p>
    </div>
  );
};

export const InboxPage = () => {
  return (
    <div className="space-y-4">
      <InboxCard
        title="Prescription Filled"
        content="Start - Metformin 500mg Tablet, Take 1 tablet 2 times..."
        date="24 Sept 2025 10:31 AM"
      />
      <InboxCard
        title="Visit Summary"
        content={`Doctor's Notes: 
- Patient has history of heart failure with preserved heart function, high blood pressure, and cholesterol.
- Usually eats two servings of fruit (mainly bananas, grapes) and simple vegetables with rice.
- Does not drink soft drinks.`}
        date="21 Sept 2025 11:15 AM"
      />
    </div>
  );
};
