export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-gray-500">
          <p className="mb-1">
            EPREL Smart Buy — University Data Product Project
          </p>
          <p>
            Data sourced from the{' '}
            <a
              href="https://eprel.ec.europa.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              EU Product Registry for Energy Labelling (EPREL)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
