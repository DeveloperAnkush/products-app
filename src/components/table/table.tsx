import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { visuallyHidden } from "@mui/utils";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Data,
  EnhancedTableProps,
  EnhancedTableToolbarProps,
  HeadCell,
  Order,
  Products,
} from "../../utils/types";
import DeleteProductDialog from "../modals/deleteProductDialog";

const createData = (
  actions: JSX.Element,
  id: string,
  productName: string,
  category: string,
  description: string,
  expiryDate: string,
  costPrice: number,
  sellPrice: number,
  discount: number,
  discountSellPrice: number,
  finalPrice: number
): Data => {
  return {
    actions,
    id,
    productName,
    category,
    description,
    expiryDate,
    costPrice,
    sellPrice,
    discount,
    discountSellPrice,
    finalPrice,
  };
};

const headCells: readonly HeadCell[] = [
  {
    id: "actions",
    label: "Actions",
  },
  {
    id: "productName",
    label: "Product Name",
  },
  {
    id: "category",
    label: "Category",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "expiryDate",
    label: "Expiry Date",
  },
  {
    id: "costPrice",
    label: "Cost Price",
  },
  {
    id: "sellPrice",
    label: "Sell Price",
  },
  {
    id: "discount",
    label: "Discount (%)",
  },
  {
    id: "discountSellPrice",
    label: "Discounted Sell Price",
  },
  {
    id: "finalPrice",
    label: "Final Price",
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all productName",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={"none"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    numSelected,
    handleDeleteDialog,
    handleAdd,
    searchQuery,
    handleSearch,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Box
          sx={{
            flex: "1 1 100%",
            display: "flex",
            alignItems: "center",
            gap: 5,
            p: 2,
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            All Products
          </Typography>
          <TextField
            variant="outlined"
            type="search"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete Products">
          <IconButton onClick={handleDeleteDialog}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add Product">
          <Button variant="outlined" endIcon={<AddIcon />} onClick={handleAdd}>
            Add
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function CommonTable(props: { productData: Products[] }) {
  const { productData } = props;
  const navigate = useNavigate();

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("sellPrice");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [clicked, setClicked] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isDialog, setIsDialog] = useState({
    isAddEditDialogOpen: false,
    isDeleteDialogOpen: false,
  });

  const filteredData = productData.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const rows = filteredData?.map((item) => {
    return createData(
      <Box sx={{ display: "flex", gap: 1 }}>
        <EditIcon onClick={() => handleEdit(item.id!)} />
        <DeleteIcon onClick={() => handleDeleteIcon(item.id!)} />
      </Box>,
      item.id!,
      item.productName,
      item.category,
      item.description,
      item.expiryDate,
      item.costPrice,
      item.sellPrice,
      item.discount,
      item.discountSellPrice,
      item.finalPrice
    );
  });

  const openModal = (open: boolean, key: string) => {
    setIsDialog((prevState) => ({ ...prevState, [key]: open }));
  };

  const handleAdd = () => {
    navigate(`/product-details`);
  };

  const handleEdit = (selectedItem: string) => {
    navigate(`/product-details/${selectedItem}`);
  };

  const handleDeleteIcon = (clickedItem: string) => {
    openModal(true, "isDeleteDialogOpen");
    setClicked(clickedItem);
  };

  const handleDeleteDialog = () => {
    openModal(true, "isDeleteDialogOpen");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((_, index) => index !== selectedIndex);
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const visibleRows = React.useMemo(() => {
    const sortedRows = [...rows].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (order === "desc") {
        if (bValue < aValue) return -1;
        if (bValue > aValue) return 1;
      } else {
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
      }

      return 0;
    });

    if (searchQuery.length > 0) {
      return sortedRows;
    }

    return sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, rows, searchQuery]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={4} sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteDialog={handleDeleteDialog}
          handleAdd={handleAdd}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.id)}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.actions}</TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.productName}
                    </TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.expiryDate}</TableCell>
                    <TableCell>{row.costPrice}</TableCell>
                    <TableCell>{row.sellPrice}</TableCell>
                    <TableCell>{`${row.discount}%`}</TableCell>
                    <TableCell>{row.discountSellPrice}</TableCell>
                    <TableCell>{row.finalPrice}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {isDialog.isDeleteDialogOpen && (
        <DeleteProductDialog
          open={isDialog.isDeleteDialogOpen}
          handleClose={() => {
            openModal(false, "isDeleteDialogOpen");
            setClicked(null);
            setSelected([]);
          }}
          clickedData={clicked}
          selectedData={selected}
        />
      )}
    </Box>
  );
}
