import { Dispatch, SetStateAction } from "react";
import { Grid, List, ListItem, Pagination } from "@mui/material";
import { useSelector } from "../../store/hooks";
import { selectCheckIns, selectCount } from "../../store/timeSlice";
import CheckInAddEdit from "./CheckInAddEdit";
import CheckInItem from "./CheckInItem";

interface CheckInListProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

function CheckInList({ page, setPage }: CheckInListProps) {
  const checkIns = useSelector(selectCheckIns);
  const count = useSelector(selectCount);

  return (
    <>
      <List
        sx={{
          "& li": {
            border: "1px solid #DDD",
          },
          "& li:first-child": {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          },
          "& li:last-child": {
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          },
        }}
      >
        <ListItem>
          <CheckInAddEdit />
        </ListItem>
        {Object.keys(checkIns).length > 0 ? (
          Object.entries(checkIns).map(([id, c]) => (
            <CheckInItem checkIn={c} key={id} />
          ))
        ) : (
          <ListItem sx={{ color: "text.secondary" }}>
            No check ins within the selected time period
          </ListItem>
        )}
      </List>
      <Grid container justifyContent="center">
        <Pagination
          count={Math.ceil(count / 10)}
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </Grid>
    </>
  );
}

export default CheckInList;
