export const ExamplePrototype2 = () => {
  return (
    <div className="w-full p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Prototype 2
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        This component uses Tailwind CSS utility classes. You can easily style
        your prototypes with Tailwind!
      </p>
      <div className="flex gap-4">
        <button className="px-4 bg-blue-500 py-2 hover:bg-blue-600 text-white rounded-md transition-colors">
          Primary
        </button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors">
          Secondary
        </button>
      </div>
    </div>
  );
};
