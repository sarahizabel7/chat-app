import {
  ListItem as MuiListItem,
  ListItemAvatar,
  Skeleton,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";

const SkeletonText = () => {
  return <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="100%" />;
};

const SkeletonListItem = () => {
  return (
    <MuiListItem disablePadding>
      <ListItemButton disabled>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText primary={<SkeletonText />} secondary={<SkeletonText />} />
      </ListItemButton>
    </MuiListItem>
  );
};

const SkeletonList = () => {
  return (
    <>
      <SkeletonListItem />
      <Divider />
      <SkeletonListItem />
      <Divider />
      <SkeletonListItem />
      <Divider />
      <SkeletonListItem />
      <Divider />
      <SkeletonListItem />
    </>
  );
};

export { SkeletonList };
