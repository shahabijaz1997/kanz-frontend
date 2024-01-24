import LinearProgress from "@mui/material/LinearProgress";

const LightGrayWidthLinearProgressBar = ({ labelString }: any): any => {
  return (
    <span className="flex gap-5 items-center">
      {" "}
      <LinearProgress
        variant="determinate"
        value={50}
        sx={{
          width: 400,
          padding: 0,
          margin: 1,
          height: 6,
          borderRadius: 10,
          backgroundColor: "white",
          "& .MuiLinearProgress-bar": {
            borderRadius: 10,
            backgroundColor: "#F2F2F2",
          },
        }}
      />
      <span className="text-xs font-medium">{labelString}</span>
    </span>
  );
};
export default LightGrayWidthLinearProgressBar;
