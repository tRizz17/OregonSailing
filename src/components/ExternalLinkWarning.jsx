function ExternalLinkWarning({ website, onConfirm, onCancel }) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">Leaving Oregon Sailing Races</h3>
        <p className="text-gray-600 mb-6">
          You're about to visit an external website: {website}
          <br /><br />
          This link will open in a new tab. Please note that we are not responsible for the content of external websites.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue to Website
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExternalLinkWarning; 