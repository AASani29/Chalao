import { useEffect, useState } from 'react';
import { useProctoring } from '../../../hooks/useProctoring';

const Exam = () => {
  const [preventCopy, setPreventCopy] = useState(true);
  const [forceFullScreen, setForceFullScreen] = useState(true); // Start with fullscreen enabled

  const { fullScreen, copyProtection } = useProctoring({
    preventCopy,
    forceFullScreen,
  });

  const toggleCopyProtection = () => {
    setPreventCopy(prev => !prev);
  };

  const handleFullscreen = () => {
    if (fullScreen.status === 'off') {
      fullScreen.trigger();
      setForceFullScreen(true);
    }
  };

  // Initial fullscreen trigger and monitoring
  useEffect(() => {
    // Initial trigger
    if (forceFullScreen && fullScreen.status === 'pending') {
      fullScreen.trigger();
    }
    // Monitor and maintain
    if (forceFullScreen && fullScreen.status === 'off') {
      fullScreen.trigger();
    }
  }, [fullScreen.status, forceFullScreen, fullScreen.trigger]);
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Exam Component</h1>

      {/* Copy Protection Controls */}
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
          className={`w-full py-2 rounded mb-4 ${
            preventCopy
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          } text-white transition-colors`}
        >
          {preventCopy ? 'Disable Copy Protection' : 'Enable Copy Protection'}
        </button>

        {/* Fullscreen Controls */}
        <p className="mb-2">
          Fullscreen Mode is:
          <span
            className={`ml-2 font-bold ${
              fullScreen.status === 'on' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {fullScreen.status === 'on' ? 'Active' : 'Inactive'}
          </span>
        </p>

        {fullScreen.status !== 'not-supported' && (
          <button
            onClick={handleFullscreen}
            className={`w-full py-2 rounded ${
              fullScreen.status === 'on'
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
            disabled={fullScreen.status === 'on'}
          >
            {fullScreen.status === 'on'
              ? 'Fullscreen Active'
              : 'Enter Fullscreen Mode'}
          </button>
        )}
      </div>

      {/* Exam Content */}
      <div className="bg-gray-100 p-4 rounded">
        <p>Exam content goes here. Try copying this text!</p>
        <p>{preventCopy ? "You can't copy" : 'You can copy'}</p>

        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Write something then try to copy from here"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Paste the copied text here"
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Exam;
