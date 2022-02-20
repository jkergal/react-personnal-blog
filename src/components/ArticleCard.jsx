import React from 'react'
import '../utils/style/ArticleCard.css'
import styled from 'styled-components'

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

export default function ArticleCard(props) {
    return (
        <StyledArticleCardContainer bannerUrl={props.url}>
            <StyledArticleInfosContainer>
                <StyledH3>{props.title}</StyledH3>
            </StyledArticleInfosContainer>
        </StyledArticleCardContainer>
    )
}
