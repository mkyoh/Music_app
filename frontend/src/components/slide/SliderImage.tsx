import dibekulu from "../../../src/images/dibekulu.jpg";
import kasmasse from "../../../src/images/kasmasse.jpg";
import kasmasse1 from "../../../src/images/kasmasse1.jpg";
import mahmud from "../../../src/images/mahmud.jpg";
import ninagirma from "../../../src/images/ninagirma.jpg";
import rophnan from "../../../src/images/rophnan.jpg";


interface SliderImage {
  description?: string;
  urls: string;
}

const SliderImage: SliderImage[] = [

  {
    
    urls: dibekulu,
  },
  {
    description: "Kassmase",
    urls: kasmasse,
  },
  
  {
    description: "Mahmud Ahmed",
    urls: mahmud,
  },
  {
    description: "Kassmase",
    urls: kasmasse1,
  },
  {
    description: "Nina Girma ",
    urls: ninagirma,
  },
  {
    description: "Rophnan VI",
    urls: rophnan,
  },
  
];

export default SliderImage;