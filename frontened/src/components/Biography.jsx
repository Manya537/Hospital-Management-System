import React from 'react'

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="About ZeeCare" />
      </div>

      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>

        <p>
          ZeeCare Medical Institute is a healthcare provider focused on delivering comprehensive medical services with a strong commitment to patient well-being and quality care. Established to address diverse health needs, the institute ensures accessible and reliable treatment for individuals and families.
        </p>

        <p>
          Our facility offers a wide range of medical services across multiple specialties including general medicine, surgery, cardiology, orthopedics, and emergency care. We combine experienced medical professionals with modern healthcare technology to provide accurate diagnosis and effective treatment.
        </p>

        <p>
          At ZeeCare, patient comfort and safety are our top priorities. We believe in compassionate care, ethical medical practices, and personalized treatment plans tailored to each patient’s needs.
        </p>

        <p>
          With a mission to improve community health standards, ZeeCare Medical Institute continues to grow as a trusted name in healthcare services, dedicated to excellence and continuous improvement.
        </p>
      </div>
    </div>
  );
};

export default Biography;

