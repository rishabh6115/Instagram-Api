import React from "react";
import { Box, Image, Grid } from "@chakra-ui/react";

const Card = ({ likes, comments, followers, pic }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Image
        src={pic}
        borderRadius="10px 10px 0 0"
        display="flex"
        height={{ md: "450px" }}
      ></Image>
      <Grid templateColumns="repeat(3,1fr)" fontWeight="700" color="white">
        <Box bg="red.400">
          Likes<div>{likes}</div>
        </Box>
        <Box bg="facebook.400">
          <div>Comments</div>
          {comments}
        </Box>
        <Box bg="teal.400">
          <div>Engagement</div>
          {followers}%
        </Box>
      </Grid>
    </Box>
  );
};

export default Card;
