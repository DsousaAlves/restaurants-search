import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Skeleton} from '../index';

const Card = styled.div`
    display: flex;
    justify-content: center;
    width: 90px;
    height: 90px;
    border-radius: 8px;
    background-image: url(${(props) => props.photo});
    background-size: cover;
`;

const Title = styled.span`
    font-family: ${(props) => props.theme.fonts.regular};
    color: #fff;
    font-size: 16px;
    padding: 8px;
`;

export default ({photo, title}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    useEffect(() => {
        const imageLoader = new Image();
        imageLoader.src = photo;
        imageLoader.onload = () => setImageLoaded(true);
    }, [photo])
    return (
        <>
            {imageLoaded ? (
                <Card photo={photo} >
                    <Title>{title}</Title>
                </Card>
            ) : (
                <Skeleton width="90px" height="90px" />
            )}
        </>

    )
};