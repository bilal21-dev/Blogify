// import { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';  // Import PropTypes
// import '../../styles/PopUp.css';
// import { MdCancel } from "react-icons/md";
// import axios from 'axios'
// function PopUp({ closePopUp, addBlog }) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const editorRef = useRef(null);

//   useEffect(() => {
//     const Quill = window.Quill; // Access Quill from CDN
//     if (editorRef.current && !editorRef.current.quillInstance) {
//       editorRef.current.quillInstance = new Quill(editorRef.current, {
//         theme: 'snow', // Quill's default theme
//       });
//     }
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImagePreview(event.target.result);
//       };
//       reader.readAsDataURL(file);
//       setImage(file);
//     }
//   };

//   const handleSubmit = async () => {
//     let userID = localStorage.getItem("user");
//     userID = JSON.parse(userID);
//     userID = userID._id;
//     const content = editorRef.current.quillInstance.root.innerHTML;
//     const blogData = {
//       title,
//       description,
//       image,
//       content,
//     };
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("content", content);
//     if (image) {
//       formData.append("image", image);
//     } 
//     formData.append("author", userID);

//     addBlog(blogData)
//     alert('Blog saved successfully!');
//     closePopUp(); // Close the pop-up after submission
//     setTitle('');
//     setDescription('');
//     setImage(null);
//     setImagePreview(null);

//     let result = await axios.post("http://localhost:5000/home", formData, {
//       headers: { "Content-Type": "multipart/form-data" }
//     });
//     result = result.data;
//   };
//   const animation = {
//     animation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
//   }

//   return (
//     <div className="popup-overlay">
//       <div className="popup-container" style={animation}>
//         <button className="close-btn" onClick={closePopUp}>
//           <MdCancel />
//         </button>
//         <h1 className="heading font-extrabold text-blue-900 text-3xl">Create Blog</h1>
//         <div className="form-group">
//           <label htmlFor="title" className='font-bold'>Title</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter the blog title"
//             className="input-field focus:outline-none focus:ring-blue-900 focus:border-blue-900"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description" className='font-bold'>Description</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter a short description"
//             className="textarea-field focus:outline-none focus:ring-blue-900 focus:border-blue-900"
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label htmlFor="image" className='font-bold'>Upload Image</label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="file-input focus:outline-none focus:ring-blue-900 focus:border-blue-900"
//           />
//           {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
//         </div>
//         <div className="form-group ">
//           <label htmlFor="editor" className='font-bold'>Content</label>
//           <div ref={editorRef} className="quill-editor "></div>
//         </div>
//         <button className="submit-btn bg-blue-900 hover:bg-blue-950 hover:transition-colors duration-300" onClick={handleSubmit}>
//           Save Blog
//         </button>
//       </div>

//     </div>


//   );
// }

// PopUp.propTypes = {
//   closePopUp: PropTypes.func.isRequired,
// };

// export default PopUp;


import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MdCancel, MdCloudUpload, MdEdit } from "react-icons/md";
import { FaImage, FaFileAlt, FaPen } from "react-icons/fa";
import axios from 'axios'
import { showSuccess, showError } from '../../utils/toast';

function PopUp({ closePopUp, addBlog, onBlogCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const Quill = window.Quill; // Access Quill from CDN
    if (editorRef.current && !editorRef.current.quillInstance) {
      editorRef.current.quillInstance = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['clean']
          ]
        }
      });
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      showError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let userID = localStorage.getItem("user");
      userID = JSON.parse(userID);
      userID = userID._id;
      const content = editorRef.current.quillInstance.root.innerHTML;
      const blogData = {
        title,
        description,
        image,
        content,
      };
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      } 
      formData.append("author", userID);

      addBlog(blogData)
      
      let result = await axios.post("http://localhost:5000/home", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      showSuccess('Blog saved successfully!');
      
      // Refresh the blogs list on the homepage
      if (onBlogCreated) {
        await onBlogCreated();
      }
      
      closePopUp();
      setTitle('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error saving blog:', error);
      showError('Failed to save blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[9999] animate-fadeIn">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/40"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      {/* Modal Container */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <FaPen className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Create Your Story</h1>
                <p className="text-blue-100 text-sm">Share your thoughts with the world</p>
              </div>
            </div>
            <button 
              onClick={closePopUp}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30 group"
            >
              <MdCancel className="text-white text-2xl group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 pb-12 max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Title Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <FaFileAlt className="text-blue-600" />
                  Title
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your blog title..."
                    className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Description Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <MdEdit className="text-purple-600" />
                  Description
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a compelling description..."
                    rows="4"
                    className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="group">
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <FaImage className="text-green-600" />
                  Featured Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-dashed border-green-300 rounded-2xl cursor-pointer hover:from-green-100 hover:to-blue-100 hover:border-green-400 transition-all duration-300 group-hover:scale-[1.02]"
                  >
                    <MdCloudUpload className="text-4xl text-green-600 mb-3" />
                    <p className="text-green-700 font-medium">Click to upload image</p>
                    <p className="text-green-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
                
                {imagePreview && (
                  <div className="mt-4 relative group">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-2xl shadow-lg border border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white font-medium">Image Preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Content Editor */}
            <div className="group">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <MdEdit className="text-indigo-600" />
                Content
              </label>
              <div className="relative">
                <div 
                  ref={editorRef} 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-gray-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all duration-300 mt-2"
                  style={{ minHeight: '300px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={closePopUp}
              className="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <FaPen className="text-lg" />
                  Publish Blog
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleUp {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px);
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleUp {
          animation: scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
        
        /* Quill Editor Customization */
        .ql-toolbar {
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          border: none;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .ql-container {
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          border: none;
          font-size: 16px;
        }
        
        .ql-editor {
          min-height: 200px;
          padding: 20px;
        }
        
        .ql-editor::before {
          color: #9ca3af;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

PopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  onBlogCreated: PropTypes.func,
};

export default PopUp;