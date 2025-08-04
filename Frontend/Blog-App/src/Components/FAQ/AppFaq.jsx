// import React from 'react';
// import { Collapse } from 'antd';
// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;
// const items = [
//   {
//     key: '1',
//     label: 'This is panel header 1',
//     children: <p>{text}</p>,
//   },
//   {
//     key: '2',
//     label: 'This is panel header 2',
//     children: <p>{text}</p>,
//   },
//   {
//     key: '3',
//     label: 'This is panel header 3',
//     children: <p>{text}</p>,
//   },
// ];
// const AppFaq = () => {
//   const onChange = (key) => {
//     console.log(key);
//   };
//   return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
// };
// export default AppFaq;
import React from 'react';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
  {
    key: '1',
    label: (
      <span className="hover:text-blue-950 font-bold">
          How do I create a blog on verse
      </span>
  ),
    children: <div>
      <p className='font-bold'>To create a blog:</p>
      <ol className='text-gray-600 text-sm'>
        <li>Sign up for an account or log in if you already have one.</li>
        <li>Navigate to your profile and click on the "Create Blog" button.</li>
        <li>Fill in the required details like title, content, and tags.</li>
        <li>Click "Publish" to share your blog with the world.</li>
      </ol>
    </div>
  },
  {
    key: '2',
    label: (
      <span className="hover:text-blue-950 font-bold">
         Can I edit or delete a blog after publishing it?
      </span>
  ),
    children: <p className="text-gray-600 text-sm">Yes, you can edit or delete your blogs anytime. Go to your profile, find the blog you want to modify, and select the "Edit" or "Delete" option.</p>,
  },
  {
    key: '3',
    label: (
      <span className="hover:text-blue-950 font-bold">
         Is there a way to like or comment on blogs?
      </span>
  ),
    children: <p className="text-gray-600 text-sm">Absolutely! You can like blogs by clicking the heart icon and share your thoughts by leaving comments at the bottom of each blog post.</p>,
  },
  {
    key: '4',
    label: (
      <span className="hover:text-blue-950 font-bold">
         What should I do if I forget my password?
      </span>
  ),
    children: <p className="text-gray-600 text-sm">If you forget your password, click on the "Forgot Password" link on the login page. Enter your email, and you'll receive instructions to reset your password.</p>,
  },
];

const AppFaq = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center"> {/* Apply flex to center the content */}
      <div className="faq p-6 rounded-lg shadow-lg max-w-2xl w-full mt-2 mb-2">
        <h1 className="text-2xl font-semibold text-white mb-4">Frequently Asked Questions</h1>
        <Collapse
          items={items}
          defaultActiveKey={['1']}
          onChange={onChange}
          className="bg-white rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default AppFaq;
