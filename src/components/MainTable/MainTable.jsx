import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { tableData } from '../../data/tableData';

const regions = Object.entries(tableData).map(([regionName, regionProps]) => {
  return { name: regionName, years: { ...regionProps.G } };
});

const tableHeadYears = Array.from(
  regions.reduce((acc, nextVal) => {
    Object.keys(nextVal.years).forEach(year => acc.add(year));
    return acc;
  }, new Set())
);

const tableHeadSigns = ['XX', 'YY', 'ZZ'];

export const MainTable = () => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="Main table">
      <TableHead>
        <TableRow>
          <TableCell align="center" rowSpan={2}>
            Region
          </TableCell>
          {tableHeadYears.map(year => (
            <TableCell key={year} align="center" colSpan={3}>
              {year}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          {tableHeadYears.map(() =>
            tableHeadSigns.map(sign => (
              <TableCell key={sign} align="center">
                {sign}
              </TableCell>
            ))
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {regions.map(region => {
          return (
            <TableRow key={region.name}>
              <TableCell align="center">{region.name}</TableCell>
              {tableHeadYears.map(year => {
                return tableHeadSigns.map(sign => {
                  const tableLabel = region.years?.[year]?.[sign]?.value || '';
                  return (
                    <TableCell
                      key={sign + year + region.name}
                      align="center"
                      onClick={() => {
                        window.open(
                          '/tables-test-task/popup-table',
                          'Popup Table',
                          'left=100,top=100,width=900,height=500'
                        );
                      }}
                    >
                      {tableLabel}
                    </TableCell>
                  );
                });
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);
