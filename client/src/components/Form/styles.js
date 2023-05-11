
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: '40px',
    backgroundImage: 'linear-gradient(to top, #6DD5FA 0%,#ffffff 60%,#ffffff 100%)',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '15px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    borderRadius: '40px',
  },
  buttonClear: {
    marginBottom: 10,
    borderRadius: '40px',
  },
}));
