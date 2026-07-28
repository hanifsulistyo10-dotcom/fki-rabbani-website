interface Props {
  badge: string;
  title: string;
  highlight?: string;
  description: string;
}

export default function SectionTitle({
  badge,
  title,
  highlight,
  description,
}: Props) {
  return (
    <div className="mb-20 text-center">

      <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

        {badge}

      </span>

      <h2 className="mt-6 text-4xl font-black text-slate-900 md:text-5xl">

        {title}

        {highlight && (
          <span className="text-emerald-700">
            {" "}
            {highlight}
          </span>
        )}

      </h2>

      <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-600">

        {description}

      </p>

    </div>
  );
}