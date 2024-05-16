import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Link,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import api from "../api";
import { Link as RouterLink } from "react-router-dom";
import SearchStock from "./SearchStock";

interface WatchlistItem {
  id: number;
  user: number;
  stock_symbol: string;
  name: string;
  type: string;
  region: string;
  market_open: string;
  market_close: string;
  timezone: string;
  currency: string;
}

interface Stock {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    getWatchlist();
  }, []);

  const getWatchlist = async () => {
    try {
      const response = await api.get("/api/watchlist/");
      setWatchlist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWatchlist = async (stock: Stock) => {
    try {
      await api.post("/api/watchlist/", {
        stock_symbol: stock["1. symbol"],
        name: stock["2. name"],
        type: stock["3. type"],
        region: stock["4. region"],
        market_open: stock["5. marketOpen"],
        market_close: stock["6. marketClose"],
        timezone: stock["7. timezone"],
        currency: stock["8. currency"],
      });
      getWatchlist();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromWatchlist = async (id: number) => {
    try {
      await api.delete(`/api/watchlist/delete/${id}/`);
      getWatchlist();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Add to Watchlist
        </Typography>
        <SearchStock addToWatchlist={addToWatchlist} />
      </Box>
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Stocks Watchlist
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Market Open</TableCell>
                <TableCell>Market Close</TableCell>
                <TableCell>Timezone</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {watchlist.map((stock: WatchlistItem) => (
                <TableRow key={stock.id}>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      underline="none"
                      to={`/stock/${stock.stock_symbol}`}
                      variant="h6"
                    >
                      {stock.stock_symbol}
                    </Link>
                  </TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>{stock.type}</TableCell>
                  <TableCell>{stock.region}</TableCell>
                  <TableCell>{stock.market_open}</TableCell>
                  <TableCell>{stock.market_close}</TableCell>
                  <TableCell>{stock.timezone}</TableCell>
                  <TableCell>{stock.currency}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteFromWatchlist(stock.id)}
                      variant="contained"
                      color="error"
                      startIcon={<Delete />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Container>
  );
};

export default Watchlist;
