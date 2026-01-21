
"use client";

import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsBriefcaseFill, BsDribbble, BsFacebook, BsGithub, BsInstagram, BsStars, BsTwitter } from "react-icons/bs";
import { MdContactPage } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AppFooter() {
  return (
    <Footer container  className="">
      <div className="w-full ">
        {/* <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand
              href="#"
              name="Social App"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink as={Link} to={'/'}>kudo</FooterLink>
                <FooterLink href="#">portfolio</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow me" />
              <FooterLinkGroup col>
                <FooterLink href="https://github.com/esraakhaled123"   target="_blank">Github</FooterLink>
                <FooterLink href="https://github.com/esraakhaled123"   target="_blank">Linkedin</FooterLink>
                
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div> */}
        {/* <FooterDivider /> */}
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright  by="Esraa khaled" year={2026} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon 
  href='https://my-portfolio-hitc.vercel.app/'
  target="_blank" 
  icon={BsStars} 
/>
            <FooterIcon href="https://github.com/esraakhaled123"   target="_blank" icon={BsGithub} />

           
         
        
       
          </div>
        </div>
      </div>
    </Footer>
  );
}
