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

const StyledH3 = styled.h3`
    font-family: Bitter Italic Semibold;
`

const StyledReadMoreLink = styled(Link)`
    font-family: Bitter Italic Medium;
    test-decoration: underline;
`

export default function ArticleCard(props) {
    const articleLink = `/article/${props.id}`

    // const [articleData, set ArticleData] =

    return (
        <StyledArticleCardContainer bannerUrl={props.url}>
            <StyledArticleInfosContainer>
                <StyledReadMoreLink to={articleLink}>
                    <StyledH3>{props.title}</StyledH3>
                </StyledReadMoreLink>
            </StyledArticleInfosContainer>
        </StyledArticleCardContainer>
    )
}
