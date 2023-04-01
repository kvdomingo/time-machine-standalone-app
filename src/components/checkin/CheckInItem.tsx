import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Grid, IconButton, ListItem, Typography } from "@mui/material";
import moment from "moment/moment";
import { useDispatch } from "../../store/hooks";
import { deleteCheckIn } from "../../store/timeSlice";
import { CheckIn } from "../../types/checkIn";
import { DEFAULT_TIME_FORMAT } from "../../utils/constants";
import CheckInAddEdit from "./CheckInAddEdit";

interface CheckInItemProps {
  checkIn: CheckIn;
}

function CheckInItem({ checkIn }: CheckInItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  function handleDeleteCheckIn(id: string) {
    dispatch(deleteCheckIn(id));
  }

  return (
    <ListItem>
      {isEditing ? (
        <CheckInAddEdit
          isEditing
          stopEditing={() => setIsEditing(false)}
          editingProps={checkIn}
        />
      ) : (
        <Grid container alignItems="center">
          <Grid item xs={12} md={1}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {moment(checkIn.created).format("MM/DD")}
            </Typography>
          </Grid>
          <Grid item xs md container alignItems="center">
            <Typography variant="body1">
              {checkIn.duration.toFixed(3)} {checkIn.duration === 1 ? "hr" : "hrs"}{" "}
            </Typography>
            <Typography variant="body1" mx={1} color="primary">
              #{checkIn.tag}
            </Typography>
            <Typography variant="body1">{checkIn.activities}</Typography>
            <Typography variant="body1" ml={1}>
              ({moment(checkIn.start_time, "HH:mm:ss").format(DEFAULT_TIME_FORMAT)} -{" "}
              {moment(checkIn.start_time, "HH:mm:ss")
                .add(checkIn.duration, "hours")
                .format("HH:mm")}
              )
            </Typography>
          </Grid>
          <Grid item xs={2} md={2} container justifyContent={{ md: "flex-end" }}>
            <IconButton color="info" onClick={() => setIsEditing(true)} size="small">
              <Edit />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDeleteCheckIn(checkIn.id)}
              size="small"
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </ListItem>
  );
}

export default CheckInItem;
