import React, { useEffect,useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import courbe from '../assets/images/courbe.png';
import ingenieur from '../assets/images/ingenieur.jpg';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ai from '../assets/images/ai.png';
import archicad from '../assets/images/archicad.png';
import cad from '../assets/images/cad.png';
import lumion from '../assets/images/lumion.png';
import ps from '../assets/images/ps.png';
import rvt from '../assets/images/rvt.png';
import sketch from '../assets/images/sketch.png';
import vray from '../assets/images/vray.png';
import badge from '../assets/images/Badge.png';
import { Award, UsersRound,BriefcaseBusiness, Facebook, InstagramIcon, FacebookIcon, Mail, Phone   } from 'lucide-react';
import img_ai from '../assets/images/img_ai.jpg';
import img_archicad from '../assets/images/img_archicad.jpg';
import img_autocad from '../assets/images/img_autocad.jpg';
import img_lumion from '../assets/images/img_Lumion.jpg';
import img_photoshop from '../assets/images/img_photoshop.jpg';
import img_revit from '../assets/images/img_revit.png';
import img_sketchup from '../assets/images/img_sketchup.jpg';
import img_vray from '../assets/images/img_v-ray.jpg';
import AutoScrollCarousel from '../pages/AutoScrollCarousel';
import forme from '../assets/images/edition/forme.png';
import BackToTopButton from './BackToTopButton';
import gendev from '../assets/images/logo_gendev.png';
import logo_ancien from '../assets/images/edition/logo_ancien.png';
import logo_nouveau from '../assets/images/edition/logo_nouveau.png';
import logo_nouveau2 from '../assets/images/edition/logo_nouveau2.png';
import logo_nouveau_nom from '../assets/images/edition/logo_nouveau_nom.png';
import logo_nouveau_icon from '../assets/images/edition/logo_nouveau_icon.png';








const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access_token');


  
  return (    
    <>
      <div className="Part1">
        <header >
          <div>
            <img src={logo_nouveau_nom} alt="" />
            {!isAuthenticated && (
              <Link to="/login">
                Se connecter
              </Link>
            )}
          </div>
        </header>

        <div className="detail_part1 ">
          <div className='acceuil_text '>
            <h1 className="">Bienvenue sur notre site</h1>
            <p className="">Entreprise de construction basée sur des formations en logiciels d'ingenieurs et de creation graphique vectorielle</p>
            <Link to="/subscription">
              S'inscrire maintenant
            </Link>            
          </div>
          <div className='social_media'>
            <a href="https://www.facebook.com/share/18hRoMfDXZ/?mibextid=wwXIfr" target='blanck'><FacebookIcon/></a>
            <a href="https://www.instagram.com/modern_technologi_of_building?igsh=dDhiM28zZXF4YTlt" target='blanck'><InstagramIcon/></a>
            <a href="mailto:moderntechnology@constructionformation.com" target='blanck'><Mail/></a>
          </div>
        </div>
        <div className="ingenieur_img">
          <img src={ingenieur} alt="ingenieur" className="ingenieur" /> 
        </div>
        <img src={courbe} alt="courbe" className="courbe" />
      </div>
      <div className="Part2">
        <div className='container_part2'>
          
          <div className='title_part2'>
            <h1>Nos Formations </h1>
          </div>

          <div className='sous_part2'>
            <span>1</span>
            <img src={ai} alt="" />
            <div>
              <h1>Adobe Illustrator</h1>
              <p>Adobe Illustrator est un logiciel de dessin vectoriel utilisé pour créer des illustrations, des logos et des graphiques.</p>
            </div>
          </div>

          <div className='sous_part2'>
            <span>2</span>
            <img src={archicad} alt="" />
            <div>
              <h1>Archicad</h1>
              <p>Archicad est un logiciel de modélisation de l'information du bâtiment (BIM) utilisé pour la conception architecturale.</p>
            </div>
          </div>

          <div className='sous_part2'>
            <span>3</span>
            <img src={cad} alt="" />
            <div>
              <h1>AutoCAD</h1>
              <p>AutoCAD est un logiciel de conception assistée par ordinateur (CAO) utilisé pour créer des dessins techniques en 2D et 3D.</p>
            </div>
          </div>

          <div className='sous_part2'>
            <span>4</span>
            <img src={lumion} alt="" />
            <div>
              <h1>Lumion</h1>
              <p>Lumion est un logiciel de rendu 3D en temps réel qui permet de créer des images, des vidéos et des panoramas à partir de modèles 3D.</p>
            </div>
          </div >

          <div className='sous_part2'>
            <span>5</span>
            <img src={ps} alt="" />
            <div>
              <h1>Photoshop</h1>
              <p>Photoshop est un logiciel de retouche d'image et de création graphique utilisé dans le design, la photographie et l'illustration.</p>
            </div>
          </div>

          <div className='sous_part2'>
            <span>6</span>
            <img src={rvt} alt="" />
            <div>
              <h1>Revit</h1>
              <p>Revit est un logiciel de modélisation de l'information du bâtiment (BIM) qui permet de concevoir des bâtiments en 3D.</p>
            </div>
          </div >

          <div className='sous_part2'>
            <span>7</span>
            <img src={sketch} alt="" />
            <div>
              <h1>SketchUp</h1>
              <p>SketchUp est un logiciel de modélisation 3D qui permet de créer des modèles architecturaux, des paysages et des objets.</p>
            </div>
          </div>

          <div className='sous_part2'>
            <span>8</span>
            <img src={vray} alt="" />
            <div>
              <h1>V-Ray</h1>
              <p>V-Ray est un moteur de rendu qui permet de créer des images réalistes à partir de modèles 3D. Il est utilisé dans l'architecture, le design d'intérieur et l'animation.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="Part3">
        <div className='badge'>
          <img src={badge} alt="" />
        </div>
        <div className='Question'>
          <div className='sous_question'>
            <h1>Pourquoi nous choisir ?</h1>
            <div>
              <span className="reponse">
                <span><UsersRound className='icon'/> </span>
                <h2>Communauté active</h2>
                <p>Intégrez une communauté d'apprenants et de formateurs passionnés : partagez, échangez et progressez ensemble.</p>
              </span>
              <span className="reponse">
                <span><Award className='icon'/></span> 
                <h2>Certification</h2>  
                <p>Obtenez une certification reconnue, valorisant vos compétences et attestant officiellement de votre réussite à la fin de votre formation.</p>             
              </span>
              <span className="reponse">
                <span><BriefcaseBusiness className='icon'/> </span>
                <h2>Emplois</h2>
                <p>Sélection des candidats prometteurs ayant brillamment réussi leur promotion  de formation au sein de l'entreprise.</p>
              </span>              
            </div>

          </div>
        </div>
      </div>

      <div className="Part4">
        <div className='title_part4'>
          <h1>Nouveau look, même passion</h1> 
        </div>  
        <div className='sous_part4'>
          <span><img src={logo_ancien} alt="" /></span>
          <span>
            <strong>Notre nouveau logo:</strong>
            <img src={logo_nouveau} alt="" />
          </span>
        </div>
      </div>

      <div className="Part5 ">
        <div className='title_part5'>
          <h1>Notre programme sur mesure</h1>
        </div>  
        <div className='sous_part5 '>
          <div className='formation'>
            <img src={img_ai} alt="" />
            <div>
              <h1>Adobe Illustrator</h1>
              <p>2 semaines</p>
              <p>Lundi - Vendredi (9h - 12h)</p>
              <span>25$</span>
            </div>
          </div>

          <div className='formation'>
            <img src={img_archicad} alt="" />
            <div>
              <h1>Archicad</h1>
              <p>4 semaines</p>
              <p>Lundi - Vendredi (9h - 12h)</p>
              <span>50$</span>
            </div>
          </div>

          <div className='formation'>
            <img src={img_autocad} alt="" />
            <div>
              <h1>AutoCAD</h1>
              <p>4 semaines</p>
              <p>Lundi - Vendredi (9h - 12h)</p>
              <span>50$</span>
            </div>
          </div>

          <div className='formation'>
            <img src={img_lumion} alt="" />
            <div>
              <h1>Lumion</h1>
              <p>4 semaines</p>
              <p>Lundi - Vendredi (9h - 12h)</p>
              <span>50$</span>
            </div>
          </div>

          <div className='formation'>
            <img src={img_photoshop} alt="" />
            <div>
              <h1>Photoshop</h1>
              <p>2 semaines</p>
              <p>Lundi - Vendredi (9h - 12h)</p>
              <span>25$</span>
            </div>
          </div>

          <div className='formation'>
            <img src={img_revit} alt="" />
            <div>
              <h1>Revit</h1>
              <p>4 semaines</p>
              <p>Lundi - Vendredi (9h - 12h)</p>
              <span>50$</span>
            </div>
          </div>

          <div className='formation'>
            <img src={img_sketchup} alt="" />
            <div>
              <h1>SketchUp</h1>
              <p>4 semaines</p>
              <p>Lundi - Vendredi (9h - 12h)</p>
              <span>50$</span>
            </div>
          </div>

          <div className='formation'>
            <img src={img_vray} alt="" />
            <div>
              <h1>V-Ray</h1>
              <p>4 semaines</p>
              <p>Lundi - Vendredi (9h - 12h)</p>
              <span>50$</span>
            </div>
          </div>
        </div>
      </div>

      <div className="Part6">
        <div className='title_part6'>
          <h1>NOS ÉDITIONS PASSÉES</h1>
          <img src={forme} alt="forme" />
        </div>
            <AutoScrollCarousel/>
      </div>
      <div className="Part7">
        <h1>Rejoignez Nous</h1>
      </div>
      <BackToTopButton/>

      
      <footer className="footer">
        <div className="sous_footer">

          <div className="footer1">
            <img src={logo_nouveau_icon} alt="" />
            <div className='footer_formation'>
              <div >
                <span>RD Congo, Goma</span>
                <h1>Formation</h1>
                <p>Adobe Illustrator</p>
                <p>Archicad</p>
                <p>AutoCAD</p>  
              </div>
              <div>
                <p>Lumion</p>
                <p>Photoshop</p>
                <p>Revit</p>
                <p>SketchUp</p>
                <p>V-Ray</p> 
              </div>              
            </div>

            <div className='dev'>
              <h1>Web Developer</h1>
              <p><img src={gendev} alt="" /> Genius Developers</p>
              <p>Goma, RD Congo</p>
              <span>
                <a href="https://www.instagram.com/geniusdeveloppers?igsh=MWtiYTRjMWk0NTk2dQ==" target='blanck'><InstagramIcon size={17}/></a>
                <a href="mailto:geniusdevelopers11@gmail.com" target='blanck'><Mail size={17}/></a>
                <a href="https://wa.me/243982639465?src=qr" target='blanck'><Phone size={17}/></a>                
              </span>

            </div>
          </div>

          <div className="footer2">
            <div className='media'>
              <a href="https://www.facebook.com/share/18hRoMfDXZ/?mibextid=wwXIfr" target='blanck'><FacebookIcon/></a>
              <a href="https://www.instagram.com/modern_technologi_of_building?igsh=dDhiM28zZXF4YTlt" target='blanck'><InstagramIcon/></a>
              <a href="mailto:moderntechnology@constructionformation.com" target='blanck'><Mail/></a>
              <a href="https://wa.me/qr/TVCNNS3EE437I1" target='blanck'><Phone/></a>
            </div>
            <p>&copy; 2023 Nom de la Société. Tous droits réservés.</p>
          </div> 
        </div>
      </footer>    
    </>
  );
};

export default Home;