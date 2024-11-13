import {Pagination, Select, MenuItem} from "@mui/material";

const CustomPagination = ({page, pageSize, handlePageSizeChange, handlePagination, totalPages}) => {
    return (
        <div className="flex justify-between p-2">
            <Select
                style={{width: 'auto', height: '35px'}}
                value={pageSize}
                onChange={handlePageSizeChange}
                variant="outlined"
            >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>

            <Pagination
                page={page}
                count={totalPages}
                onChange={handlePagination}
                shape="circular"
                color="primary"
            />
        </div>
    );
}

export default CustomPagination;