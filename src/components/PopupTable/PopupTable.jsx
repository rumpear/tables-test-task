import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper, ButtonWrapper } from './PopupTable.styled';

const tableHead = ['value', 'date', 'user', 'comment'];
const userOptions = ['Petro', 'Roman', 'Anna'];

export const PopupTable = () => {
  const [popupTableData, setPopupTableData] = useState([
    { value: 4, date: '20/02/2022', user: 'Petro', comment: 'any' },
    { value: 5, date: '21/02/2022', user: 'Roman', comment: '' },
    { value: 6, date: '22/02/2022', user: 'Anna', comment: '' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [inputDate, setInputDate] = useState(() => new Date());
  const [inputUser, setInputUser] = useState(userOptions[0]);
  const [inputComment, setInputComment] = useState('');

  const addButtonHandler = () => {
    if (!inputValue) return toast('Please fill in the required fields');

    setPopupTableData(s => [
      ...s,
      {
        value: inputValue,
        date: inputDate.toLocaleDateString(),
        user: inputUser,
        comment: inputComment,
      },
    ]);
    setInputValue('');
    setInputComment('');
  };

  const inputValueHandler = e => {
    if (e.target.value < 0) {
      setInputValue(0);
      return toast('Value cannot be less than zero');
    }
    setInputValue(e.target.value);
  };

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Popup table">
          <TableHead>
            <TableRow>
              {tableHead.map(head => (
                <TableCell key={head} align="center">
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {popupTableData.map(({ value, date, user, comment }) => {
              return (
                <TableRow key={value + date + user + comment}>
                  <TableCell key={'value: ' + value} align="center">
                    {value}
                  </TableCell>
                  <TableCell key={'date: ' + date} align="center">
                    {date}
                  </TableCell>
                  <TableCell key={'user: ' + user} align="center">
                    {user}
                  </TableCell>
                  <TableCell key={'comment: ' + comment} align="center">
                    {comment}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell key={'input-value'} align="center">
                <TextField
                  required
                  id="input-value"
                  label="Enter your value"
                  variant="outlined"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={inputValue}
                  onChange={inputValueHandler}
                />
              </TableCell>
              <TableCell key={'input-date'} align="center">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Choose date"
                    value={inputDate}
                    onChange={inputDate => setInputDate(inputDate)}
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </TableCell>
              <TableCell key={'input-user'} align="center">
                <Autocomplete
                  id="input-user"
                  options={userOptions}
                  sx={{ minWidth: 150 }}
                  value={inputUser}
                  onChange={(e, inputUser) => setInputUser(inputUser)}
                  renderInput={params => (
                    <TextField {...params} label="Select user" />
                  )}
                />
              </TableCell>
              <TableCell key={'input-comment'} align="center">
                <TextField
                  id="input-comment"
                  label="Leave a comment"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={inputComment}
                  onChange={e => setInputComment(e.target.value)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonWrapper
        variant="contained"
        aria-label="Outlined primary button group"
      >
        <Button onClick={addButtonHandler} aria-label="Add data to the table">
          Add
        </Button>
        <Button onClick={() => window.close()} aria-label="Close popup window">
          Close
        </Button>
      </ButtonWrapper>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Wrapper>
  );
};
