import React from 'react'

const Hero = ({title,imageUrl}) => {
  return (
    <div className='hero container'>
        <div className='banner'>
            <h1>{title}</h1>
            <p>
                ZeeCare Medical Institute is a healthcare provider focused on delivering comprehensive medical services with a commitment to patient well-being and quality care. Established to address diverse health needs, the institute offers a range of treatment options across various specialties, including general surgery, cardiology.
            </p>
        </div>
        <div className='banner'>
            <img src={imageUrl} alt="hero" className='animated-image' />
            <span>
                <img src="/Vector.png" alt="vector" />
            </span>
        </div>


    </div>
  )
}

export default Hero