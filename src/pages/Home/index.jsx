import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Wrapper, Container, Search, Logo, CarouselTitle, Carousel, ModalTitle, ModalContent } from './style';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import { Card, RestaurantCard, Modal, Map, Loader, Skeleton } from '../../components';
import logo from '../../assets/logo.svg';
import restaurante from '../../assets/restaurante-fake.png';

const Home = () => {
    const [value, setValue] = useState();
    const [placeID, setPlaceID] = useState(null);
    const [query, setQuery] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
    };

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setQuery(value);
        }
    }

    function handleOpenModal(placeId) {
        setPlaceID(placeId);
        setModalOpened(true);
    }

    return (
        <Wrapper>
            <Container>
                <Search>
                    <Logo src={logo} alt="Logo" />
                    <TextField
                        outlined
                        label="Pesquisar"
                        trailingIcon={<MaterialIcon role="button" icon="search" />}
                    >
                        <Input type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyPress={handleKeyPress} />
                    </TextField>
                    {restaurants.length > 0 ? (
                        <>
                        <CarouselTitle>Na sua Área</CarouselTitle>
                            <Carousel {...settings}>
                                {restaurants.map((restaurant) =>
                                    <Card key={restaurant.place_id}
                                        photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}
                                        title={restaurant.name} />
                                )}
                        </Carousel>
                        </>
                    ) : <Loader />}
                </Search>
                {restaurants.map((restaurant) =>
                    <RestaurantCard key={restaurant.place_id}
                        onClick={() => handleOpenModal(restaurant.place_id)}
                        restaurant={restaurant} />
                )}
            </Container>
            <Map query={query} placeId={placeID} />
            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
                {
                    restaurantSelected ? (
                        <>
                            <ModalTitle>{restaurantSelected?.name}</ModalTitle>
                            <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
                            <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
                            <ModalContent>
                                {restaurantSelected?.opening_hours?.open_now ? 'Aberto agora' : 'Fechado neste momento'}
                            </ModalContent>
                        </>
                    ) : (
                        <>
                            <Skeleton width="10px" height="40px" />
                            <Skeleton width="10px" height="20px" />
                            <Skeleton width="10px" height="20px" />
                            <Skeleton width="10px" height="20px" />
                        </>
                    )
                }
                
            </Modal>
        </Wrapper>
    )
};

export default Home;