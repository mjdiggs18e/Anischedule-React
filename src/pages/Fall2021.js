import React, { useEffect } from "react";
import Header from "../component/Header";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { token } from "../graphql/Query";
import { AddAnime } from "../graphql/Mutation";
import { Toaster } from "react-hot-toast";

// GraphQL Query
const FallSeason2021Anime = gql`
  query getAiringAnime {
    Page(page: 1) {
      media(
        season: FALL
        seasonYear: 2021
        format: TV
        sort: POPULARITY_DESC
        isAdult: false
      ) {
        coverImage {
          large
        }
        title {
          english
          userPreferred
        }
        id
        description
        source
        averageScore
        episodes
        nextAiringEpisode {
          episode
          timeUntilAiring
        }
        status
        startDate {
          month
          day
          year
        }
        endDate {
          month
          day
          year
        }
        studios {
          nodes {
            name
          }
        }
        popularity
        genres
      }
    }
  }
`;

//Styled Components

const AnimeContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AnimeCard = styled.div`
  width: 450px;
  height: 265px;
  background-color: #fffbf5;
  border-radius: 4px;
  margin: 2rem;
  box-shadow: 0 4px 6px rgb(49 54 68 / 5%), 0 5px 20px rgb(49 54 68 / 8%);
  display: flex;

  @media (min-width: 300px) and (max-width: 767px) {
    width: 300px;
    height: 200px;
    margin: 1rem 2rem;
  }

  @media (min-width: 768px) and (max-width: 1028px) {
    width: 650px;
  }
`;

const AnimeCardLeft = styled.div`
  overflow: hidden;
  position: relative;

  @media (min-width: 300px) and (max-width: 767px) {
    width: 200px;
  }

  & img {
    height: 265px;
    width: 185px;
  }
`;

const AnimeCardLeftTitle = styled.p`
  color: #fff;
  background-color: rgb(41, 41, 41, 0.9);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 165px;
  margin: 0;
  text-align: center;
  padding: 10px 10px;
  font-size: 14px;

  @media (min-width: 300px) and (max-width: 767px) {
    width: 110px;
  }
`;

const AnimeCardStudio = styled.span`
  display: block;
  padding: 10px 0;
  color: #75c3f0;
`;

const AnimeCardRight = styled.div`
  width: 265px;
  height: 100%;
  overflow-y: scroll;
  position: relative;

  @media (min-width: 768px) and (max-width: 1028px) {
    width: 465px;
  }
`;

const AnimeCardScore = styled.p`
  font-size: 12px;
  color: #6e859e;
  position: absolute;
  top: 0;
  right: 10px;
  margin: 10px;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 10px;
  }
`;

const AnimeCardEpisodes = styled.p`
  font-size: 12px;
  color: #6e859e;
  padding: 0 1rem;
  margin: 10px 0 0 0;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 10px;
  }
`;

const AnimeCardTimeUntilAiring = styled.p`
  color: #5c728a;
  padding: 0 1rem;
  font-weight: 500;
  margin: 10px 0 0 0;
`;

const AnimeCardDescription = styled.p`
  font-size: 12px;
  color: #6e859e;
  padding: 0 1rem;
`;

const AnimeCardGenre = styled.p`
  font-size: 12px;
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background-color: #194c71;
  margin: 0.7rem;
  border-radius: 20px;
  color: #fff;
  display: inline-block;
`;

const AnimeCardWatch = styled.div`
  display: inline-block;
  padding: 1rem;
`;

// eslint-disable-next-line no-unused-vars
function seconds(seconds) {
  if (seconds == null) {
    return "Unknown Airing Time, Check Back Later.";
  } else {
    var days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    var hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    var mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;

    if (days === 0) {
      return `${hrs} Hours, and ${mnts} Minutes`;
    } else if (hrs === 0) {
      return `${mnts} Minutes`;
    } else {
      return `${days} Days, ${hrs} Hours, and ${mnts} Minutes`;
    }
  }
}

const FallSeason2021 = () => {
  const { loading, data, error } = useQuery(FallSeason2021Anime);

  if (loading) return <span className="loader"></span>;
  if (error) return <p>Error...</p>;
  const FallAnime = data.Page.media;

  return FallAnime.map(
    ({
      coverImage: { large },
      title: { userPreferred },
      studios,
      id,
      nextAiringEpisode,
      episodes,
      description,
      averageScore,
      genres,
      startDate: { month, year },
    }) => {
      return (
        <AnimeCard key={id}>
          <AnimeCardLeft>
            <a href={`https://anilist.co/anime/${id}`}>
              <img src={large} alt="cover" />
            </a>
            <AnimeCardLeftTitle>
              {userPreferred}
              <AnimeCardStudio>
                {studios.nodes[0]?.name || "Unknown Studio"}
              </AnimeCardStudio>
            </AnimeCardLeftTitle>
          </AnimeCardLeft>
          <AnimeCardRight>
            <AnimeCardScore>
              {averageScore ? `${averageScore}%` : ""}
            </AnimeCardScore>
            <AnimeCardEpisodes>
              {nextAiringEpisode && nextAiringEpisode.episode
                ? `Ep ${nextAiringEpisode.episode} of ${
                    episodes || "?"
                  } airing in`
                : `Airing in`}
            </AnimeCardEpisodes>
            <AnimeCardTimeUntilAiring>
              {year
                ? `${month === 7 ? "July" : ""} ${year}`
                : "Finished Airing"}
            </AnimeCardTimeUntilAiring>
            <AnimeCardDescription
              dangerouslySetInnerHTML={{
                __html: description || "No description available",
              }}
            ></AnimeCardDescription>
            <AnimeCardGenre>{genres[0] || "N/A"}</AnimeCardGenre>
            <AnimeCardWatch>
              {token ? <AddAnime id={id} userPreferred={userPreferred} /> : ""}
            </AnimeCardWatch>
          </AnimeCardRight>
        </AnimeCard>
      );
    }
  );
};

const Fall2021 = () => {
  useEffect(() => {
    document.title = "AniSchedule: Fall 2021 Seasonal Anime";
  });
  return (
    <div>
      <Header />
      <Toaster />
      <AnimeContainer>
        <FallSeason2021 />
      </AnimeContainer>
    </div>
  );
};

export default Fall2021;
