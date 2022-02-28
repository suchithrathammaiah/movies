import '../styles/App.css';
import TextField from '@material-ui/core/TextField';
import Constants from '../constants/constants';

export default function SearchBar({ query, handleQuery }
  : { query: string, handleQuery: any }) {
  return (
    <div className="select-container">
      <TextField variant="outlined" id="search" label={Constants.SEARCH_PLACEHOLDER} type="search" onChange={handleQuery} value={query} fullWidth />
    </div>
  );
}