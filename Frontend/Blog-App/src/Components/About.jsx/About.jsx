// import React from 'react';

// const About = () => {
//     return (
//         <div className="bg-slate-200 min-h-screen flex items-center py-10 px-6">
//             <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
//                 {/* Heading */}
//                 <h1 className="text-4xl font-bold text-blue-900 text-center mb-6">
//                     About Our Blogging Platform
//                 </h1>

//                 {/* Intro Section */}
//                 <p className="text-gray-700 text-lg leading-relaxed mb-6">
//                     Welcome to <span className="font-semibold text-blue-900">Your Voice</span> – the blogging platform where creativity, ideas, and stories come alive. Whether you're a passionate writer or someone looking to share their journey, we provide the tools and space to connect with like-minded individuals and make your voice heard.
//                 </p>

//                 {/* What We Do */}
//                 <h2 className="text-2xl font-bold text-blue-900 mb-4">What We Do</h2>
//                 <p className="text-gray-700 text-lg leading-relaxed mb-4">
//                     Our platform simplifies the blogging experience, enabling you to focus on what matters most: your content. Here's how we support your blogging journey:
//                 </p>
//                 <ul className="list-disc list-inside space-y-3 text-gray-700">
//                     <li>
//                         <span className="font-semibold text-blue-900">Write & Share:</span> Easily create and share blogs with a few clicks.
//                     </li>
//                     <li>
//                         <span className="font-semibold text-blue-900">Engage Your Audience:</span> Allow readers to like, comment, and share your posts.
//                     </li>
//                     <li>
//                         <span className="font-semibold text-blue-900">Manage Content:</span> Organize your posts and keep track of shared blogs effortlessly.
//                     </li>
//                     <li>
//                         <span className="font-semibold text-blue-900">Community Interaction:</span> Explore content from fellow bloggers and grow your network.
//                     </li>
//                 </ul>

//                 {/* Mission Section */}
//                 <h2 className="text-2xl font-bold text-blue-900 mt-8 mb-4">Our Mission</h2>
//                 <p className="text-gray-700 text-lg leading-relaxed">
//                     At <span className="font-semibold text-blue-900">Your Voice</span>, we believe in the power of storytelling. Our mission is to provide a platform that amplifies your ideas and fosters a vibrant community of readers and writers. Whether it's your personal experiences, creative fiction, or insights into the world, we’re here to bring your stories to life.
//                 </p>

//                 {/* Vision Section */}
//                 <h2 className="text-2xl font-bold text-blue-900 mt-8 mb-4">Our Vision</h2>
//                 <p className="text-gray-700 text-lg leading-relaxed">
//                     Our vision is to become a hub for storytellers worldwide, creating an inclusive space where everyone feels encouraged to express themselves freely. Together, we aim to build a digital library of thoughts, emotions, and creativity.
//                 </p>

//                 {/* Call to Action */}
//                 <div className="mt-10 text-center">
//                     <h3 className="text-xl font-bold text-gray-800 mb-4">
//                         Join Our Community Today!
//                     </h3>
//                     <button
//                         className="bg-blue-900 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-950 transition duration-300"
//                     >
//                         Get Started
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default About;


import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  margin: 0,
  height: '200px',
  color: '#fff',
  lineHeight: '200px',
  textAlign: 'center',
  background: '#364d79',
};

const About = () => {
  const onChange = (currentSlide) => {
    console.log(`Current Slide: ${currentSlide}`);
  };

  return (
    <div className="bg-slate-200 min-h-screen flex items-center py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-6">
          About Our Blogging Platform
        </h1>

        {/* Intro Section */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-blue-900">Your Voice</span> – the blogging platform where creativity, ideas, and stories come alive. Whether you're a passionate writer or someone looking to share their journey, we provide the tools and space to connect with like-minded individuals and make your voice heard.
        </p>

        {/* Carousel Section */}
        <Carousel arrows afterChange={onChange} infinite={false}>
          <div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">What We Do</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Our platform simplifies the blogging experience, enabling you to focus on what matters most: your content. Here's how we support your blogging journey:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>
                  <span className="font-semibold text-blue-900">Write & Share:</span> Easily create and share blogs with a few clicks.
                </li>
                <li>
                  <span className="font-semibold text-blue-900">Engage Your Audience:</span> Allow readers to like, comment, and share your posts.
                </li>
                <li>
                  <span className="font-semibold text-blue-900">Manage Content:</span> Organize your posts and keep track of shared blogs effortlessly.
                </li>
                <li>
                  <span className="font-semibold text-blue-900">Community Interaction:</span> Explore content from fellow bloggers and grow your network.
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                At <span className="font-semibold text-blue-900">Your Voice</span>, we believe in the power of storytelling. Our mission is to provide a platform that amplifies your ideas and fosters a vibrant community of readers and writers. Whether it's your personal experiences, creative fiction, or insights into the world, we’re here to bring your stories to life.
              </p>
            </div>
          </div>
          <div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our vision is to become a hub for storytellers worldwide, creating an inclusive space where everyone feels encouraged to express themselves freely. Together, we aim to build a digital library of thoughts, emotions, and creativity.
              </p>
            </div>
          </div>
          <div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Join Our Community Today!
              </h3>
              <button
                className="bg-blue-900 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-950 transition duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default About;
