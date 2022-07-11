import { Button, Input, useToast, Text, Grid, Box } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import Card from "./Components/Card";

function App() {
  const [username, setUsername] = useState("");
  const [instaData, setInstaData] = useState([]);
  const [modifiedData, setModifiedData] = useState([]);
  const toast = useToast();

  const fetchData = async () => {
    if (!username) {
      toast({
        title: "Please enter the username",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const { data } = await axios.get(
        `https://graph.facebook.com/v14.0/17841403695407903?fields=business_discovery.username(${username}){followers_count,media_count,media{comments_count,like_count,media_url}}&access_token=EAGSOMZCd2vwIBANGU6ibak1n4ovDdaGd5Xodl1wHaEEeuqPrb1uQDkYlwH376TDjcWQLtbZCfNODBGyZBCPmbJJxMzN7KmZBCguIEXFOstI7rswZAcMOHDMZA9HZBIqf8kaWuEJ6phUhjQBRruEw5GuXuDYTFF7vZAYYopZCIst5vioXpjQhnm9zsCP7pfs9JM04Sw9J3s8Q1AwT6lwhpiZBBysUjoYZBqgYnDWAdjPfQp1Wbm5kHZB9HAAv
        `
      );
      setInstaData(data.business_discovery);
      setModifiedData(data.business_discovery.media.data);
    } catch (error) {
      toast({
        title: "Account Not Found Or Private",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const click = () => {
    fetchData();
  };

  return (
    <div className="App">
      <Box width={{ base: "90%", lg: "90%" }} margin="0 auto 20px auto">
        <Box mx="auto" shadow="lg" padding="30px 20px" rounded="lg" mb="100px">
          <Text mb="15px" fontWeight="700" fontSize="3xl">
            Enter Username
          </Text>
          <Input
            maxW="300px"
            mb="10px"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={click} colorScheme="red" margin="0 0 0 10px">
            Submit
          </Button>
        </Box>
        <Grid
          gap="20px"
          templateColumns={{
            base: "repeat(1,1fr)",
            lg: "repeat(3,1fr)",
            md: "repeat(2,1fr)",
          }}
          gridTemplateRows="repeat(1,1fr)"
          justifyContent="space-around"
        >
          {modifiedData.length > 0 &&
            modifiedData.map((d) => (
              <Card
                key={d.id}
                pic={
                  d.media_url
                    ? d.media_url
                    : "https://t3.ftcdn.net/jpg/03/34/83/22/360_F_334832255_IMxvzYRygjd20VlSaIAFZrQWjozQH6BQ.jpg"
                }
                likes={d.like_count}
                comments={d.comments_count}
                followers={Math.ceil(
                  ((d.like_count + d.comments_count) /
                    instaData.followers_count) *
                    100
                )}
              ></Card>
            ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
