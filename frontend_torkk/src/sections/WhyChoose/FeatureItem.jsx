export default function FeatureItem({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="group border-b border-gray-200 pb-8 transition-all duration-300 hover:border-blue-600">

      <div className="flex items-start gap-5">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-600">

          <Icon
            size={26}
            className="text-blue-600 transition-colors duration-300 group-hover:text-white"
          />

        </div>

        <div>

          <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
            {title}
          </h3>

          <p className="mt-3 max-w-sm leading-7 text-gray-500">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}