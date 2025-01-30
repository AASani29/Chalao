// import { useCopyDisable } from "./useCopyDisable";
// import { useFullScreenDetection } from './useFullScreenDetection';

// export function useProctoring({
//     preventCopy = false,
//     forceFullScreen = false
// }) {
//     // Handle copy protection
//     if (preventCopy) {
//         console.log("copying disabled");
//     } else {
//         console.log("copying enabled");
//     }
    
//     // Initialize copy disable functionality
//     useCopyDisable({ disabled: preventCopy === false });
    
//     // Initialize fullscreen functionality
//     const { fullScreenStatus, triggerFullscreen } = useFullScreenDetection({
//         disabled: !forceFullScreen
//     });

//     return {
//         fullScreen: {
//             status: fullScreenStatus,
//             trigger: triggerFullscreen
//         },
//         copyProtection: {
//             status: preventCopy ? "enabled" : "disabled"
//         }
//     };
// }

import { useCopyDisable } from "./useCopyDisable";
import { useFullScreenDetection } from './useFullScreenDetection';

export function useProctoring({
    preventCopy = false,
    forceFullScreen = false
}) {
    // Handle copy protection
    if (preventCopy) {
        console.log("copying disabled");
    } else {
        console.log("copying enabled");
    }
    
    // Initialize copy disable functionality
    useCopyDisable({ disabled: preventCopy === false });
    
    // Initialize fullscreen functionality with correct disabled state
    const { fullScreenStatus, triggerFullscreen } = useFullScreenDetection({
        disabled: false  // We don't want to disable the detection
    });

    return {
        fullScreen: {
            status: fullScreenStatus,
            trigger: triggerFullscreen
        },
        copyProtection: {
            status: preventCopy ? "enabled" : "disabled"
        }
    };
}