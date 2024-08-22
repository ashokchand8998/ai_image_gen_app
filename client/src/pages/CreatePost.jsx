/**
 * Component for creating a new post.
 *
 * This component renders a form that allows the user to enter a name, prompt, and image.
 * The form also includes a button to generate an image based on the prompt.
 * The component uses the useState hook to manage the form state.
 * The component uses the useNavigate hook from react-router-dom to navigate to the homepage after a post is created.
 * The component uses the Loader component to display a loading indicator while the image is being generated.
 * The component uses the getRandomPrompt function from the ../utils file to generate a random prompt.
 * The component uses the FormField component to render the form fields.
 */
import { useState } from 'react';
import { preview } from '../assets'
import { useNavigate } from 'react-router-dom';
import { FormField, Loader } from '../components';
import { getRandomPrompt } from '../utils'
import { apiURI } from '../constants'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Handles form submission.
   * Sends a POST request to the API to create a new post.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(`${apiURI}/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })

        await response.json()
        navigate('/')
      } catch (err) {
        console.log("err:", err)
        alert("error: ", err)
      } finally {
        setLoading(false)
      }
    } else {
      alert("Please enter a prompt and generate an image")
    }
  }

  /**
   * Handles changes to the form fields.
   * Updates the form state with the new values.
   */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  /**
   * Generates a random prompt for the user.
   * Updates the form state with the new prompt.
   */
  const handleSupriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`${apiURI}/dalle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (err) {
        console.log("err:", err)
        alert("error: ", err)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert("Plese enter a prompt")
    }
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Create
        </h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]'>
          Create imaginative and visually stunning images through by DALL-E AI and share them with others
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit} >
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Jhon Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an astronaut lounging in a tropical resort in space, vaporwave"
            handleChange={handleChange}
            value={form.prompt}
            isSupriseMe
            handleSupriseMe={handleSupriseMe}
          />

          <div
            className='border-gray-300 relative bg-gray-50 border text-gray-5900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : <img
              src={preview}
              alt='previwe'
              className='w-9/12 h-9/12 object-contain opacity-40'
            />}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5) rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button type='button'
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            onClick={generateImage}>
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text=[14px]'>Once you have created the image you want, you can share it with others in the community</p>
          <button type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >{loading ? 'Sharing...' : 'Share with the community'}</button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
