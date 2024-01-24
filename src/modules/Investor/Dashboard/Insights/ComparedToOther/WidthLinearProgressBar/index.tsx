import LinearProgress from "@mui/material/LinearProgress";

const WidthLinearProgressBar = ({ labelString }: any): any => {
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
          height: 5,
          borderRadius: 10,
          backgroundColor: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
          "& .MuiLinearProgress-bar": {
            borderRadius: 10,
            backgroundColor: "#B8E4F2",
          },
        }}
      />
      <span className="text-xs font-medium">{labelString}</span>
    </span>
  );
};
export default WidthLinearProgressBar;
