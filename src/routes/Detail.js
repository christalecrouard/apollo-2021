import React from "react";
import {useParams} from "react-router-dom"
import {gql} from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";
import {Link} from "react-router-dom";
import {toggleMovie, LIKE_MOVIE} from "../components/Movie";

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id){
            id
            title
            medium_cover_image
            description_intro
            genres
            language
            rating
            isLiked @client
        }
        suggestions(id: $id){
            medium_cover_image
            id
            isLiked @client
        }
    }
`;

const Container = styled.div`
    height: 120vh;
    width: 100%;
    background-image: linear-gradient(-45deg, #22427c, #048b9a);
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Header = styled.header`
    background-image: black;
    height: 7vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
    font-weight: 500;
    color: white;
`;

const Subtitle = styled.h4`
    font-size  : 35px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 20px;
    margin-bottom: 10px;
    justify-content: space-around;
`;

const Poster = styled.div`
    width: 50vh;
    height: 60%;
    background-color: transparent;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`;

const Movies = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    width: 150vh;
    position: relative;
    top: -120px;
`;

const Page = styled.header`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;`;

export default () => {
    const {id} = useParams();
    const {loading,data} = useQuery(GET_MOVIE, {
        variables: {id : +id }
    });
    return (
        <Page>
            <Header>
                <Link to={`/`}>
                <Subtitle>HOME</Subtitle>
                </Link>
            </Header>
            <Container>
                <Column>
                    <Title>{loading
                    ? "Loading.."
                    : `${data.movie.title}`}
                    </Title>
                    <Subtitle>{data?.movie?.language} | {data?.movie?.rating}</Subtitle>
                    <Description> {data?.movie?.description_intro}</Description>
                    <Description>Tags : {data?.movie?.genres}</Description>
                    <Description>{`${data?.movie?.isLiked ? "Liked":"Not Liked" }`}</Description>
                </Column>
                <Poster bg={data?.movie?.medium_cover_image}
                ></Poster>
            </Container>
            <Title>SUGGESTIONS</Title>
            <Movies>
                    {data?.suggestions?.map(s => (
                        <Movie 
                            key={s.id}
                            id={s.id}
                            isLiked= {s.isLiked}
                            bg={s.medium_cover_image}
                        />
                    ))}
            </Movies>
        </Page>
    );
};