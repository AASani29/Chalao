import { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { useProctoring } from '../../../hooks/useProctoring';
import { useWebcamProctor } from '../../../hooks/useWebcamProctoring';

const Exam = () => {
  const [preventCopy, setPreventCopy] = useState(true);
  const [forceFullScreen, setForceFullScreen] = useState(true);

  const { fullScreen, copyProtection } = useProctoring({
    preventCopy,
    forceFullScreen,
  });

  const { isDetecting, webcamRef, canvasRef, startDetection, alert } =
    useWebcamProctor();

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
    if (forceFullScreen && fullScreen.status === 'pending') {
      fullScreen.trigger();
    }
    if (forceFullScreen && fullScreen.status === 'off') {
      fullScreen.trigger();
    }
  }, [fullScreen.status, forceFullScreen, fullScreen.trigger]);

  // Start detection when component mounts
  useEffect(() => {
    startDetection();
  }, []);

  const renderAlerts = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {alert.map((alert, index) => (
        <div
          key={index}
          className="bg-red-500 text-white p-4 rounded-lg shadow-lg animate-fade-in"
        >
          ⚠️ {alert}
        </div>
      ))}
    </div>
  );
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Webcam and Canvas Section */}
        <div className="md:col-span-1 space-y-4">
          <div className="relative">
            <Webcam ref={webcamRef} muted={true} className="w-full rounded" />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <p className="text-center text-sm">
            Proctor Status: {isDetecting ? 'Active' : 'Starting...'}
          </p>
          {alert.length > 0 && renderAlerts()}
        </div>

        {/* Exam Content Section */}
        <div className="md:col-span-2">
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
              {preventCopy
                ? 'Disable Copy Protection'
                : 'Enable Copy Protection'}
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
      </div>
    </div>
  );
};

export default Exam;
