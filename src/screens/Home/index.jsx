import BackgroundVideo from "../../components/BackgroundVideo";
import NavBar from "../../components/NavBar";
import SliderImg from "../../components/SlidesImg";
import WhatsAppButton from "../../components/WhatsAppButton";
import Marquee from "../../components/Marquee"
const Home = () => {


  return (
    <>
      <Marquee/>
      <NavBar colorNav="white" />
      <BackgroundVideo />
      <SliderImg />
      <WhatsAppButton/>
    </>
  );
};

export default Home;
