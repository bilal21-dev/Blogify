import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import '../../styles/PopUp.css';
import { MdCancel } from "react-icons/md";
import axios from 'axios'
function PopUp({ closePopUp, addBlog }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const Quill = window.Quill; // Access Quill from CDN
    if (editorRef.current && !editorRef.current.quillInstance) {
      editorRef.current.quillInstance = new Quill(editorRef.current, {
        theme: 'snow', // Quill's default theme
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
    alert('Blog saved successfully!');
    closePopUp(); // Close the pop-up after submission
    setTitle('');
    setDescription('');
    setImage(null);
    setImagePreview(null);

    let result = await axios.post("http://localhost:5000/home", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    result = result.data;
  };
  const animation = {
    animation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
  }

  return (
    <div className="popup-overlay">
      <div className="popup-container" style={animation}>
        <button className="close-btn" onClick={closePopUp}>
          <MdCancel />
        </button>
        <h1 className="heading font-extrabold text-blue-900 text-3xl">Create Blog</h1>
        <div className="form-group">
          <label htmlFor="title" className='font-bold'>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the blog title"
            className="input-field focus:outline-none focus:ring-blue-900 focus:border-blue-900"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className='font-bold'>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short description"
            className="textarea-field focus:outline-none focus:ring-blue-900 focus:border-blue-900"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image" className='font-bold'>Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input focus:outline-none focus:ring-blue-900 focus:border-blue-900"
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>
        <div className="form-group ">
          <label htmlFor="editor" className='font-bold'>Content</label>
          <div ref={editorRef} className="quill-editor "></div>
        </div>
        <button className="submit-btn bg-blue-900 hover:bg-blue-950 hover:transition-colors duration-300" onClick={handleSubmit}>
          Save Blog
        </button>
      </div>

    </div>


  );
}

PopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
};

export default PopUp;
