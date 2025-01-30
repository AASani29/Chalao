// import { useCallback, useEffect, useState } from "react";
// import { isChrome, isIOS, isMobileSafari } from "react-device-detect";

// export const triggerFullscreen = () => {
//   const methods = [
//     "requestFullscreen",
//     "webkitRequestFullscreen",
//     "webkitRequestFullScreen",
//     "mozRequestFullScreen",
//     "msRequestFullscreen",
//   ];

//   const ref = document.body;
//   if (ref) {
//     for (const name of methods) {
//       if (name in ref) {
//         ref[name]?.()?.catch((err) => {
//           // console.error(err)
//         });
//         ref.style.overflowY = "auto";
//         break;
//       }
//     }
//   }
// };

// export function useFullScreenDetection({ disabled } = { disabled: false }) {
//   /**
//    * status can be:
//    * 'pending' - not determined if browser is in fullscreen mode
//    * 'on' - browser is in fullscreen mode
//    * 'off' - browser is not in fullscreen mode
//    * 'not-supported' - device doesn't support fullscreen
//    */
//   const [fullScreenStatus, setFullScreenStatus] = useState("pending");

//   const changeFullscreenStatus = useCallback(() => {
//     setFullScreenStatus(
//       document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.mozFullScreenElement ||
//         document.msFullscreenElement
//         ? "on"
//         : "off"
//     );
//   }, []);

//   const listener = useCallback((e) => {
//     /**
//      * This code is for preventing user from ENTERING full screen mode using keyboard.
//      * Browsers don't allow us to prevent user from exiting full screen.
//      * Because in that case, the `fullscreenchange` does not fire and our state becomes invalid.
//      * The browser becomes full screen but our `status` still says 'off'.
//      * The `fullscreenchange` event only fires when we use JavaScript to trigger full screen.
//      */
//     if (["F11", "Escape"].includes(e.key)) {
//       e.preventDefault();
//     }
//   }, []);

//   useEffect(() => {
//     if (disabled) {
//       setFullScreenStatus("pending");
//       return;
//     }

//     /**
//      * 'Mobile Safari' and 'iOS Chrome' don't support fullscreen.
//      */
//     if (isMobileSafari || (isChrome && isIOS)) {
//       setFullScreenStatus("not-supported");
//       return;
//     }

//     changeFullscreenStatus();

//     const vendorPrefix = ["", "moz", "webkit", "ms"];
//     vendorPrefix.forEach(function (prefix) {
//       document.addEventListener(
//         prefix + "fullscreenchange",
//         changeFullscreenStatus
//       );
//     });

//     window.addEventListener("keydown", listener);

//     return () => {
//       vendorPrefix.forEach(function (prefix) {
//         document.removeEventListener(
//           prefix + "fullscreenchange",
//           changeFullscreenStatus
//         );
//       });
//       window.removeEventListener("keydown", listener);
//     };
//   }, []);

//   return { fullScreenStatus, triggerFullscreen };
// }
import { useCallback, useEffect, useState } from "react";
import { isChrome, isIOS, isMobileSafari } from "react-device-detect";

export const triggerFullscreen = () => {
  const methods = [
    "requestFullscreen",
    "webkitRequestFullscreen",
    "webkitRequestFullScreen",
    "mozRequestFullScreen",
    "msRequestFullscreen",
  ];

  const ref = document.body;
  if (ref) {
    for (const name of methods) {
      if (name in ref) {
        ref[name]?.()?.catch((err) => {
          console.error('Fullscreen error:', err);  // Added error logging
        });
        ref.style.overflowY = "auto";
        break;
      }
    }
  }
};

export function useFullScreenDetection({ disabled } = { disabled: false }) {
  const [fullScreenStatus, setFullScreenStatus] = useState("pending");

  const changeFullscreenStatus = useCallback(() => {
    setFullScreenStatus(
      document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
        ? "on"
        : "off"
    );
  }, []);

  const listener = useCallback((e) => {
    if (["F11", "Escape"].includes(e.key)) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (disabled) {
      setFullScreenStatus("pending");
      return;
    }

    if (isMobileSafari || (isChrome && isIOS)) {
      setFullScreenStatus("not-supported");
      return;
    }

    // Initial status check
    changeFullscreenStatus();

    const vendorPrefix = ["", "moz", "webkit", "ms"];
    vendorPrefix.forEach((prefix) => {
      document.addEventListener(
        prefix + "fullscreenchange",
        changeFullscreenStatus
      );
    });

    window.addEventListener("keydown", listener);

    return () => {
      vendorPrefix.forEach((prefix) => {
        document.removeEventListener(
          prefix + "fullscreenchange",
          changeFullscreenStatus
        );
      });
      window.removeEventListener("keydown", listener);
    };
  }, [disabled, changeFullscreenStatus, listener]); // Added missing dependencies

  return { fullScreenStatus, triggerFullscreen };
}