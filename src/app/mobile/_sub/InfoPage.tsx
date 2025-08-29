import Image from "next/image";

export const InfoPage = () => {
  return (
    <div className="space-y-4">
      <InfoCard
        title="Diabetes (Pocket Guide)"
        subtitle="An easy to follow visual guide."
        image="/images/diabetes-guide.jpg"
      />
      <InfoCard
        title="Be Aware - What is Diabetes"
        subtitle="Diabetes is a condition where your body cannot manage sugar properly, resulting in too much sugar in your blood."
        image="/images/diabetes-stat.png"
      />
      <InfoCard
        title="Exercises for beginners"
        subtitle="Get started with simple and healthy exercises to combat diseases."
        image="/images/exercise-guide.jpg"
      />
    </div>
  );
};

function InfoCard({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <div className="rounded-xl border shadow-sm overflow-hidden">
      <div className="relative h-32">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-2">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
