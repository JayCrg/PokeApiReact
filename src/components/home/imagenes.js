
import Carousel from 'react-bootstrap/Carousel';

function Imagenes() {
    const img = ["../../images/poke1.webp", "../../images/poke2.webp", "../../images/poke3.webp"]

            // img.map((img, index) => {
            //     <Carousel.Item interval={1500}>
            //     <img
            //         className="d-block w-100"
            //         src={require(img)}
            //         alt={index+'slide'}

            //     />
            // </Carousel.Item>
            
            // })
    return(
            <Carousel.Item interval={1500}>
                 <img
                    className="d-block w-100"
                    src={require('../../images/poke2.webp')}
                    alt={'1 slide'}

                />
            </Carousel.Item>
    )
}
export default Imagenes;