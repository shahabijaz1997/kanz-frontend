
import LinearProgress from '@mui/material/LinearProgress';

const LinearProgressBar = ({}: any) :any => {

    return (

          <LinearProgress
            variant="determinate"
            value={50}
            sx={{
              padding:0,
              margin:1,
              height: 5,
              borderRadius: 10,
              backgroundColor: (theme) =>
                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
              '& .MuiLinearProgress-bar': {
                borderRadius: 10,
                backgroundColor: '#B8E4F2',
              },
            }}
          />
      );

};
export default LinearProgressBar;
