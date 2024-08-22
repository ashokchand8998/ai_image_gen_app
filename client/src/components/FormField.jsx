const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSupriseMe, handleSupriseMe }) => {
  return (
    <>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className='block-me font-medium text-gray-900'>
          {labelName}
        </label>
        {isSupriseMe && (
          <button
            type='button'
            onClick={handleSupriseMe}
            className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'>
            Suprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required
        placeholder={placeholder}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3'
      />
    </>
  )
}

export default FormField
