import React from 'react'
import './Template.css'
import styled from 'styled-components'

export default function Template(props) {
    const PageGrid = styled.div`
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 300px;
        grid-template-rows: ${props.headerHeight} 1fr;
    `

    const HeaderBox = styled.div`
        grid-column: 1;
        grid-row: 1;
    `

    const ContentBox = styled.div`
        grid-column: 1;
        grid-row: 2;

        overflow: scroll;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    `

    const BloggerCardBox = styled.div`
        grid-column: 2;
        grid-row: 1/3;

        border-left: #2a2b2a solid 1px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    `

    return (
        <PageGrid>
            <HeaderBox>{props.Header}</HeaderBox>

            <ContentBox className="content-box">{props.Page}</ContentBox>

            <BloggerCardBox>{props.BloggerCard}</BloggerCardBox>
        </PageGrid>
    )
}
