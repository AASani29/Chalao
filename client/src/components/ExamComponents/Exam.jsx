import { useState } from 'react';
import { useProctoring } from '../../../hooks/useProctoring';

const Exam = () => {
  // State to track whether copy is prevented
  const [preventCopy, setPreventCopy] = useState(true);

  // Use the useProctoring hook with the current preventCopy state
  useProctoring({ preventCopy });

  // Toggle function to switch copy prevention on/off
  const toggleCopyProtection = () => {
    setPreventCopy(prev => !prev);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Exam Component</h1>

      <div className="mb-4">
        <p className="mb-2">
          Copy Protection is currently:
          <span
            className={`ml-2 font-bold ${
              preventCopy ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {preventCopy ? 'Enabled' : 'Disabled'}
          </span>
        </p>

        <button
          onClick={toggleCopyProtection}
          className={`w-full py-2 rounded ${
            preventCopy
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          } text-white transition-colors`}
        >
          {preventCopy ? 'Disable Copy Protection' : 'Enable Copy Protection'}
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <p>Exam content goes here. Try copying this text!</p>
        <p>{preventCopy ? "You can't copy" : 'You can copy'}</p>
        <form placeholder="Paste the copied text here">
          <input
            type="text"
            placeholder="Write something then try to copy from here"
            className="w-full border p-2 rounded"
          />
        </form>
        <form placeholder="Paste the copied text here">
          <input
            type="text"
            placeholder="Paste the copied text here"
            className="w-full border p-2 rounded"
          />
        </form>
      </div>
    </div>
  );
};

export default Exam;
