import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
} from '@material-ui/core';
import './Listings.css';
import ListingController from './ListingController';
import { CSVDownload } from 'react-csv';
import { DownloadPropTypes } from 'react-csv/components/Download';

export interface ListingState {
  showListingResults: boolean;
  downloadCSV: boolean;
  searchCriteria: any;
}

export interface AgentModel {
  firstName: string;
  lastName: string;
  email: string;
  cellNumber: string;
  officeNumber: string;
}

export interface ListingModel {
  id?: string;
  closingDate: string;
  price: string;
  address: string;
  city: string;
  zipCode: string;
  bedCount: number;
  fullBathCount: number;
  halfBathCount: number;
  yearBuilt: number;
  listingAgent: AgentModel;
  sellingAgent: AgentModel;
}

class Listings extends React.Component<any, ListingState> {
  listingController: ListingController;
  listings: ListingModel[];
  constructor(props: any) {
    super(props);
    this.listingController = new ListingController();
    this.listings = this.listingController.getListings();
    this.state = {
      showListingResults: false,
      downloadCSV: false,
      searchCriteria: {},
    };
  }

  locations = [
    { name: 'Cumming', zipCode: '30472' },
    { name: 'Alpharetta', year: '30004' },
    { name: 'Johns Creek', year: '30022' },
  ];

  exportToCSV = () => {
    this.setState({ downloadCSV: true });
  };

  getCSVData = () => {
    let downloadData: string[][] = [
      [
        'Closing Date',
        'Price',
        'Address',
        'City',
        'Zip Code',
        'Total Bedroom',
        'Total Full Bathroom',
        'Total Half Bathroom',
        'Year Built',
        'List Agent Name',
        'List Agent Cell Number',
        'Selling Agent Name',
        'Selling Agent Cell Number',
        'Selling Agent Email',
        'Selling Agent Office Number',
      ],
    ];
    this.listings.forEach((listing) => {
      downloadData.push([
        listing.closingDate,
        listing.price,
        listing.address,
        listing.city,
        listing.zipCode,
        listing.bedCount.toString(),
        listing.fullBathCount.toString(),
        listing.halfBathCount.toString(),
        listing.yearBuilt.toString(),
        listing.listingAgent.firstName + ' ' + listing.listingAgent.lastName,
        listing.listingAgent.cellNumber,
        listing.sellingAgent.firstName + ' ' + listing.sellingAgent.lastName,
        listing.sellingAgent.cellNumber,
        listing.sellingAgent.email,
        listing.sellingAgent.officeNumber,
      ]);
    });
    return downloadData;
  };

  search = () => {
    this.setState({ showListingResults: true });
  };

  render() {
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6'>Listings</Typography>
          </Toolbar>
        </AppBar>
        <br />
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='space-around'
          width='50%'
        >
          <Typography variant='h4'>Search:</Typography>
          <br />
          <Box display='flex' flexDirection='row' justifyContent='space-around'>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='space-around'
            >
              Style:
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.searchCriteria.attached}
                    name='attached'
                    color='primary'
                  />
                }
                label='Attached'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.searchCriteria.detatched}
                    name='detattched'
                    color='primary'
                  />
                }
                label='Dettatched'
              />
            </Box>
            <Autocomplete
              id='combo-box-demo'
              options={this.locations}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label='Location' variant='outlined' />
              )}
            />
            <FormControl>
              <InputLabel htmlFor='standard-adornment-amount'>
                Min Price
              </InputLabel>
              <Input
                value={this.state.searchCriteria.minPrice}
                startAdornment={
                  <InputAdornment position='start'>$</InputAdornment>
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='standard-adornment-amount'>
                Max Price
              </InputLabel>
              <Input
                value={this.state.searchCriteria.maxPrice}
                startAdornment={
                  <InputAdornment position='start'>$</InputAdornment>
                }
              />
            </FormControl>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='space-around'
            >
              Payment Method:
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.searchCriteria.cash}
                    name='cash'
                    color='primary'
                  />
                }
                label='Cash'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.searchCriteria.mortgage}
                    name='mortgage'
                    color='primary'
                  />
                }
                label='Mortgage'
              />
            </Box>
          </Box>
          <div style={{ textAlign: 'right' }}>
            <Button
              onClick={this.search}
              variant='contained'
              color='primary'
              endIcon={<Icon>search</Icon>}
            >
              Search
            </Button>
          </div>
        </Box>
        <br />
        {this.state.showListingResults && (
          <React.Fragment>
            <div style={{ textAlign: 'right' }}>
              <Button
                onClick={this.exportToCSV}
                variant='contained'
                color='primary'
                endIcon={<Icon>insert_drive_file</Icon>}
              >
                Export to CSV
              </Button>
              {this.state.downloadCSV && (
                <CSVDownload
                  filename='10/04/2020-Listings Extract'
                  data={this.getCSVData()}
                  target='_blank'
                />
              )}
            </div>
            <br />
            <TableContainer>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Closing Date</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Zip Code</TableCell>
                    <TableCell>Total Bedroom</TableCell>
                    <TableCell>Total Full Bathroom</TableCell>
                    <TableCell>Total Half Bathroom</TableCell>
                    <TableCell>Year Built</TableCell>
                    <TableCell>List Agent Name</TableCell>
                    <TableCell>List Agent Cell Number</TableCell>
                    <TableCell>Selling Agent Name</TableCell>
                    <TableCell>Selling Agent Cell Number</TableCell>
                    <TableCell>Selling Agent Email</TableCell>
                    <TableCell>Selling Agent Office Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.listings.map((listing) => (
                    <TableRow key={listing.address}>
                      <TableCell component='th' scope='listing'>
                        {listing.closingDate}
                      </TableCell>
                      <TableCell>{listing.price}</TableCell>
                      <TableCell>{listing.address}</TableCell>
                      <TableCell>{listing.city}</TableCell>
                      <TableCell>{listing.zipCode}</TableCell>
                      <TableCell>{listing.bedCount}</TableCell>
                      <TableCell>{listing.fullBathCount}</TableCell>
                      <TableCell>{listing.halfBathCount}</TableCell>
                      <TableCell>{listing.yearBuilt}</TableCell>
                      <TableCell>
                        {listing.listingAgent.firstName +
                          ' ' +
                          listing.listingAgent.lastName}
                      </TableCell>
                      <TableCell>{listing.listingAgent.cellNumber}</TableCell>
                      <TableCell>
                        {listing.sellingAgent.firstName +
                          ' ' +
                          listing.sellingAgent.lastName}
                      </TableCell>
                      <TableCell>{listing.sellingAgent.cellNumber}</TableCell>
                      <TableCell>{listing.sellingAgent.email}</TableCell>
                      <TableCell>{listing.sellingAgent.officeNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Listings;
