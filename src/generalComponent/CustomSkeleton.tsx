import { Box } from "@mui/material";

interface ICustomSkeleton {
  height?: string | number;
  width?: string | number;
}
const CustomSkeleton = ({
  height = "100%",
  width = "100%",
}: ICustomSkeleton) => {
  return (
    <Box
      sx={{
        height: height,
        width: width,
        backgroundColor: "#e0e0e0", // Light grey background
        borderRadius: "4px", // Optional: round corners
        position: "relative",
        overflow: "hidden",
        animation: "pulse 1.5s infinite",
      }}
    >
      {/* Optional: add a gradient effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "-100%",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.2) 100%)",
          animation: "slide 1.5s infinite",
        }}
      />
      <style>
        {`
            @keyframes pulse {
              0% {
                background-color: #e0e0e0;
              }
              50% {
                background-color: #c0c0c0;
              }
              100% {
                background-color: #e0e0e0;
              }
            }
            
            @keyframes slide {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}
      </style>
    </Box>
  );
};

export default CustomSkeleton;
