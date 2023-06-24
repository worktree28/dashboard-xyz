export default function Home(props) {
  return (
    <>
    <p>Home</p>
      <button
        className='bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150'
        type='button'
        onClick={props.logout}
      >
        logout
      </button>
    </>
  );
}
