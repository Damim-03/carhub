import { VideoCarousel } from './components';

const Newspaper = () => {
  return (
    <section
  id="highlights"
  className="w-screen overflow-hidden h-auto py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-white flex justify-center items-center dark:bg-slate-800"
>
  <div className="max-w-screen-lg w-full">
    <VideoCarousel />
  </div>
</section>
  );
}

export default Newspaper;