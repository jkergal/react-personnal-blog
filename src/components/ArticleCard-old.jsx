import React from 'react'
import '../utils/style/ArticleCard.css'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledArticleCardContainer = styled.div`
    height: 250px;
    width: 550px;
    background-image: ${(props) => `url(${props.bannerUrl})`};
    background-size: cover;
    display: flex;
    justify-content: center;
    margin: 20px;
    border-radius: 10px;
`

const StyledArticleInfosContainer = styled.div`
    height: 250px;
    width: 550px;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    color: #e5ba21;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`

const StyledReadMoreLink = styled(Link)`
    // font-family: Bitter Italic Medium;
    text-decoration: none;
    color: #e5ba21;
`

export default function ArticleCard(props) {
    const articleLink = `/article/${props.id}`

    return (
        <StyledArticleCardContainer bannerUrl={props.url}>
            <StyledArticleInfosContainer>
                <StyledReadMoreLink to={articleLink}>
                    <h2>{props.title}</h2>
                </StyledReadMoreLink>
            </StyledArticleInfosContainer>
        </StyledArticleCardContainer>
    )
}
