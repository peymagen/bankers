import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
} from "@mui/material";
import React from "react";

const TableSkeleton: React.FC<{column: number}> = ({column}) => {
  const SongSkeleton = () => (
    <TableRow>
      {[...Array(column)].map((_, index) => (
        <TableCell key={index}>
          <Skeleton variant="text" width="100%" />
        </TableCell>
      ))}
    </TableRow>
  );
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="songs table">
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            {[...Array(column).map((_,index) =>(
                <TableCell key={index}><Skeleton variant="rectangular" width="100%" /></TableCell>
            ))]}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <SongSkeleton key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableSkeleton